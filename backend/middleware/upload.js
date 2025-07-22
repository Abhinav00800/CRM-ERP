const multer = require('multer');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// File filter for allowed file types
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|csv|txt/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(
      new ErrorResponse(
        'Error: File upload only supports the following filetypes - ' +
          filetypes,
        400
      )
    );
  }
};

// Initialize upload middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter
});

// Middleware for handling single file upload
const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(new ErrorResponse('File size too large. Max 5MB allowed', 400));
          }
          return next(new ErrorResponse(err.message, 400));
        } else if (err) {
          return next(err);
        }
      }
      next();
    });
  };
};

// Middleware for handling multiple file uploads
const uploadMultiple = (fieldName, maxCount = 5) => {
  return (req, res, next) => {
    upload.array(fieldName, maxCount)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(new ErrorResponse('File size too large. Max 5MB allowed', 400));
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return next(new ErrorResponse(`Maximum ${maxCount} files allowed`, 400));
          }
          return next(new ErrorResponse(err.message, 400));
        } else if (err) {
          return next(err);
        }
      }
      next();
    });
  };
};

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple
};