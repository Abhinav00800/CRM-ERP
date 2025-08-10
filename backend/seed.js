const mongoose = require('mongoose');
const User = require('./models/User');
const Admin = require('./models/Admin');
const TeamLead = require('./models/TeamLead');
const Client = require('./models/Client');
const Developer = require('./models/Developer');
const Team = require('./models/Team');
const Project = require('./models/Project');
const PaymentSummary = require('./models/PaymentSummary');

// ... previous imports and connection logic ...

async function seed() {
  try {
    await mongoose.connect('mongodb://localhost:27017/crm_erp_db', {
      useNewUrlParser: true,
    });

    // Clear collections
    await User.deleteMany({});
    await Admin.deleteMany({});
    await TeamLead.deleteMany({});
    await Client.deleteMany({});
    await Developer.deleteMany({});
    await Team.deleteMany({});
    await Project.deleteMany({});
    await PaymentSummary.deleteMany({});

    // 1. Create Users
    const adminUser = await User.create({
      name: 'Super Admin',
      email: 'admin@example.com',
      role: 'admin',
      password: '$2b$10$HpJZZR9kw8eZa3fjQrqM1u0exUSKQnkJxVy/S2VZXXQxwKV6xeyeO',
    });

    const teamLeadUser = await User.create({
      name: 'Alice TeamLead',
      email: 'alice.teamlead@example.com',
      role: 'teamlead',
      password: '$2b$10$HpJZZR9kw8eZa3fjQrqM1u0exUSKQnkJxVy/S2VZXXQxwKV6xeyeO',
    });

    const clientUser = await User.create({
      name: 'Bob Client',
      email: 'bob.client@example.com',
      role: 'client',
      password: '$2b$10$HpJZZR9kw8eZa3fjQrqM1u0exUSKQnkJxVy/S2VZXXQxwKV6xeyeO',
    });

    const developerUser = await User.create({
      name: 'Charlie Developer',
      email: 'charlie.dev@example.com',
      role: 'developer',
      password: '$2b$10$HpJZZR9kw8eZa3fjQrqM1u0exUSKQnkJxVy/S2VZXXQxwKV6xeyeO',
    });

    // 2. Create role-specific docs
    await Admin.create({ user: adminUser._id });

    await TeamLead.create({
      user: teamLeadUser._id,
      avatar: 'https://example.com/avatar/alice.png',
      teamSize: 5,
      projectsManaged: 3,
      workload: 70,
    });

    const client = await Client.create({
      user: clientUser._id,
      companyName: 'Bob\'s Company',
      contactNumber: '+91 9876543210',
      address: '123 Business Street, Mumbai, India'
    });

    await Developer.create({
      user: developerUser._id,
      skills: ['JavaScript', 'Node.js', 'MongoDB'],
      experience: 3,
    });

    // 3. Create Team
    const team = await Team.create({
      name: 'Awesome Dev Team',
      teamLead: teamLeadUser._id,
      members: [developerUser._id],
    });

    // 4. Multiple Projects for same client
    const projectsData = [
      { name: 'Project Phoenix', description: 'Important client project', status: 'Completed', budget: 50000 },
      { name: 'Project Orion', description: 'Backend optimization', status: 'In Progress', budget: 30000 },
      { name: 'Project Titan', description: 'Mobile app development', status: 'Pending', budget: 70000 },
    ];

    for (const data of projectsData) {
      const project = await Project.create({
        name: data.name,
        teamLeadId: teamLeadUser._id,
        clientId: client._id,
        description: data.description,
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        status: data.status,
        budget: data.budget
      });

      await PaymentSummary.create({
        clientId: client._id,
        projectId: project._id,
        totalInvoiced: data.budget,
        paid: Math.floor(data.budget / 2),
        pending: data.budget - Math.floor(data.budget / 2),
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
      });
    }

    console.log('Database seeded successfully with multiple projects for same client.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seed();
