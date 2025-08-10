const express = require("express");
const projectRouter = express.Router();
const Project = require("../models/Project");
const Client = require("../models/Client");
const User = require("../models/User");
const teamLead = require("../models/TeamLead")
const Developer = require("../models/Developer")

// CREATE Project
projectRouter.post("/", async (req, res) => {
  try {
    const { name, status, clientId, teamLeadId, teamId, access } = req.body;

    // Check if client exists
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ error: "Client not found" });

    // Check if team lead exists
    const teamLead = await User.findById(teamLeadId);
    if (!teamLead || teamLead.role !== "team_lead") {
      return res.status(400).json({ error: "Invalid team lead" });
    }

    const project = await Project.create({
      name,
      status,
      client: clientId,
      teamLead: teamLeadId,
      team: teamId || null,
      access: access || []
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all projects with populated fields
projectRouter.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("clientId", "companyName")
      .populate({
        path: "teamLeadId",
        populate: { path: "user", select: "name email" }
      })
      .populate({
        path: "teamId",
        populate: [
          { path: "teamLead", select: "name email" },
          { path: "members", select: "name email" }
        ]
      })
      .populate("developers", "name email")
      .populate("paymentSummary");

    res.json({ projects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET projects for the logged-in client
projectRouter.get("/client", async (req, res) => {
  try {
    const userId = req.user._id;

    const clientId = await Client.findOne({ user : userId})

    const projects = await Project.find({ clientId })
      .populate("clientId", "companyName")
      .populate("paymentSummary");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// GET single project by ID
projectRouter.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("client", "companyName")
      .populate("teamLead", "name email")
      .populate("team", "name")
      .populate("access", "name email");

    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE project
projectRouter.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE project
projectRouter.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = projectRouter;
