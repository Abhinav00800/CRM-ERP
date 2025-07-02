import verifyRole from "../middlewares/verifyRole.js";
import express from "express";
import { createLead, createClient, getActiveLeads, getClosedLeads, updateLeadStatus } from "../controllers/salesController.js";


const salesRouter = express.Router();

// Middleware to verify user role for sales and admin
salesRouter.use(verifyRole([2, 1])); // Assuming 2 is sales and 1 is admin

// Route to create a new lead
salesRouter.post("/createLead", createLead);

// Route to get active leads
salesRouter.get("/activeLeads", getActiveLeads);

// Route to get closed leads    
salesRouter.get("/closedLeads", getClosedLeads);

// Route to update lead status
salesRouter.post("/updateLeadStatus", updateLeadStatus);

// Route to create a new client
salesRouter.post("/createClient", createClient);





export default salesRouter;