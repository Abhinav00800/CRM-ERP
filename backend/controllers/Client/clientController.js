const Client = require('../../models/Client/Client');
const User = require('../../models/User/User');
const Project = require('../../models/Project/Project');

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const { status, industry, search } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    if (industry) {
      query.industry = industry;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const clients = await Client.find(query)
      .populate('assignedAccountManager', 'firstName lastName email')
      .populate('projects', 'name status');

    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate('assignedAccountManager', 'firstName lastName email')
      .populate({
        path: 'projects',
        select: 'name status startDate endDate budget',
        populate: {
          path: 'manager',
          select: 'firstName lastName'
        }
      });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new client
exports.createClient = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      company, 
      address, 
      industry,
      contactPerson,
      website,
      paymentTerms,
      notes,
      assignedAccountManager
    } = req.body;

    // Check if client already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists' });
    }

    const client = new Client({
      name,
      email,
      phone,
      company,
      address,
      industry,
      contactPerson,
      website,
      paymentTerms,
      notes,
      assignedAccountManager
    });

    await client.save();

    // If account manager is assigned, update their client list
    if (assignedAccountManager) {
      await User.findByIdAndUpdate(assignedAccountManager, {
        $addToSet: { clients: client._id }
      });
    }

    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update client
exports.updateClient = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      company, 
      address, 
      industry,
      contactPerson,
      website,
      paymentTerms,
      notes,
      assignedAccountManager
    } = req.body;

    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // If changing account manager, update both old and new managers
    if (assignedAccountManager && assignedAccountManager.toString() !== client.assignedAccountManager?.toString()) {
      // Remove from old manager
      if (client.assignedAccountManager) {
        await User.findByIdAndUpdate(client.assignedAccountManager, {
          $pull: { clients: client._id }
        });
      }

      // Add to new manager
      await User.findByIdAndUpdate(assignedAccountManager, {
        $addToSet: { clients: client._id }
      });
    }

    client.name = name || client.name;
    client.email = email || client.email;
    client.phone = phone || client.phone;
    client.company = company || client.company;
    client.address = address || client.address;
    client.industry = industry || client.industry;
    client.contactPerson = contactPerson || client.contactPerson;
    client.website = website || client.website;
    client.paymentTerms = paymentTerms || client.paymentTerms;
    client.notes = notes || client.notes;
    client.assignedAccountManager = assignedAccountManager || client.assignedAccountManager;

    const updatedClient = await client.save();

    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Remove from account manager's client list
    if (client.assignedAccountManager) {
      await User.findByIdAndUpdate(client.assignedAccountManager, {
        $pull: { clients: client._id }
      });
    }

    res.json({ message: 'Client removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload client document
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Upload file to cloud storage (implementation depends on your storage solution)
    const uploadResult = await uploadToCloudinary(req.file);

    const document = {
      name: req.body.name || req.file.originalname,
      url: uploadResult.secure_url
    };

    client.documents.push(document);
    await client.save();

    res.json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};