import db from "../utils/db.js";
import passwordGenerator from "generate-password";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const validStatus = ["created", "verified", "in_progress", "closed", "successful"];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // App-specific password (not your normal password)
  },
});

const createLead = async (req, res) => {
  const { name, clientId, source, priority } = req.body;
  const userId = req.user.userId;

  if (!name || !clientId) {
    return res
      .status(400)
      .json({ message: "Name and valid clientId are required" });
  }

  const result = await db.query(
    `
    INSERT INTO leads (name, status, source, priority, assigned_to, client_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,
    [name, "created", source || "unknown", priority || 1, userId, clientId]
  );

  return res.status(201).json({
    message: "Lead created successfully",
    lead: result.rows[0],
  });
};

const createClient = async (req, res) => {
  const { name, email, phone, company, address, position } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "Name, email, and phone are required",
    });
  }

  // Check if client already exists
  const existingClient = await db.query(
    `SELECT id FROM clients WHERE email = $1`,
    [email]
  );

  if (existingClient.rowCount > 0) {
    return res.status(400).json({
      message: "Client with this email already exists",
    });
  }

  // Generate password and hash
  const password = passwordGenerator.generate({
    length: 12,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    strict: true,
  });
  const hashedPassword = await bcrypt.hash(password, 12);

  // Insert into DB
  const result = await db.query(
    `
    INSERT INTO clients (name, email, phone, company, address, position, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `,
    [
      name,
      email,
      phone,
      company || "unknown",
      address || "unknown",
      position || "unknown",
      hashedPassword,
    ]
  );

  // Email content
  const mailOptions = {
    from: `"CRM-ERP" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to DMS",
    text: `Welcome to DMS, ${name}!\n 
Your account has been created.\n
Here are your login details:\n\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after logging in.
Click here to login: http://localhost:3000/login`,
    html: `
      <h1>Welcome to DMS</h1>
      <h2>Here are your login details:</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Please change your password after logging in.</p>
      <p><a href="http://localhost:3000/login">Click here to login</a></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions); 
    return res.status(201).json({
      message: "Client created successfully",
      client: result.rows[0],
      emailSent: true,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(201).json({
      message: "Client created successfully, but email failed to send",
      client: result.rows[0],
      emailSent: false,
    });
  }
};


const getActiveLeads = async (req, res) => {
  const userId = req.user.userId;

  const result = await db.query(
    `
    SELECT 
      id, name, status, source, priority, created_at
    FROM leads
    WHERE assigned_to = $1 AND status != 'closed'
    ORDER BY priority DESC, created_at DESC
  `,
    [userId]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({ message: "No active leads found" });
  }
  else return res.status(200).json(result.rows);
};

const getClosedLeads = async (req, res) => {
  const userId = req.user.userId;

  const result = await db.query(
    `
    SELECT 
      id, name, status, source, priority, updated_at, created_at
    FROM leads
    WHERE assigned_to = $1 AND status = 'closed'
    ORDER BY updated_at DESC
  `,
    [userId]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "No active leads found" });
  }
  else return res.status(200).json(result.rows);
};

const updateLeadStatus = async (req, res) => {
  const { leadId, status } = req.body;
  const userId = req.user.userId;

  if (!leadId || !status || !validStatus.includes(status)) {
    return res.status(400).json({ message: "Lead ID and status are required" });
  }

  const result = await db.query(
    `
    UPDATE leads
    SET status = $1, updated_at = NOW()
    WHERE id = $2 AND assigned_to = $3
    RETURNING *
  `,
    [status, leadId, userId]
  );

  if (result.rowCount === 0) {
    return res
      .status(404)
      .json({ message: "Lead not found or not assigned to you" });
  }

  return res.status(200).json({
    message: "Lead status updated successfully",
    lead: result.rows[0],
  });
};

export {
  getActiveLeads,
  getClosedLeads,
  createLead,
  createClient,
  updateLeadStatus,
};
