const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);
