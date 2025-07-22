const cloudinary = require('cloudinary').v2;
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const ErrorResponse = require('./errorResponse');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Promisify Cloudinary methods
const uploadAsync = promisify(cloudinary.uploader.upload);

/**
 * Uploads a file to Cloudinary
 * @param {Object} file - Multer file object
 * @param {string} folder - Cloudinary folder path
 * @param {Array} allowedFormats - Allowed file formats
 * @returns {Promise<Object>} Cloudinary upload result
 */
const uploadToCloudinary = async (file, folder = 'project-documents', allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'txt']) => {
  try {
    // Validate file exists
    if (!file) {
      throw new ErrorResponse('No file provided', 400);
    }

    // Validate file format
    const fileExt = path.extname(file.originalname).toLowerCase().substring(1);
    if (!allowedFormats.includes(fileExt)) {
      throw new ErrorResponse(`Invalid file format. Allowed formats: ${allowedFormats.join(', ')}`, 400);
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new ErrorResponse('File size too large. Max 5MB allowed', 400);
    }

    // Upload to Cloudinary
    const result = await uploadAsync(file.path, {
      folder,
      resource_type: 'auto',
      use_filename: true,
      unique_filename: false,
      overwrite: true
    });

    // Delete temp file
    fs.unlinkSync(file.path);

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    // Clean up temp file if upload fails
    if (file && file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    throw new ErrorResponse(`Upload failed: ${error.message}`, 500);
  }
};

/**
 * Deletes a file from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<Object>} Cloudinary deletion result
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok') {
      throw new Error('Failed to delete file from Cloudinary');
    }
    return result;
  } catch (error) {
    throw new ErrorResponse(`Deletion failed: ${error.message}`, 500);
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
};