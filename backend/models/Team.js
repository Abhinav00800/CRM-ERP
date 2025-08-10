const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teamLead: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // role: team_lead
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // developers
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);
