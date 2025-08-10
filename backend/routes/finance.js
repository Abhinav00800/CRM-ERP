const express = require('express');
const financeRouter = express.Router();
const Summary = require('../models/PaymentSummary');

// POST: Create new summary
financeRouter.post('/', async (req, res) => {
  try {
    const { clientId, projectId, totalInvoiced, paid, pending, dueDate } = req.body;

    if (!clientId || !projectId || !totalInvoiced || !paid || !pending || !dueDate) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const dueDateObj = new Date(dueDate);

    const summary = new Summary({
      clientId,
      projectId,
      totalInvoiced,
      paid,
      pending,
      dueDate: dueDateObj,
    });

    await summary.save();

    res.status(201).json({ message: 'Summary created', summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// GET: Get summary by clientId and projectId
financeRouter.get('/', async (req, res) => {
  try {
    const { clientId, projectId } = req.query;
    // console.log(req.query)

    if (!clientId || !projectId) {
      return res.status(400).json({ message: 'clientId and projectId are required' });
    }

    const summary = await Summary.findOne({ clientId, projectId });

    if (!summary) {
      return res.status(404).json({ message: 'Summary not found' });
    }

    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// PUT: Update summary by clientId and projectId
financeRouter.put('/', async (req, res) => {
  try {
    const { clientId, projectId, totalInvoiced, paid, pending, dueDate } = req.body;

    if (!clientId || !projectId) {
      return res.status(400).json({ message: 'clientId and projectId are required' });
    }

    const updateData = {};
    if (totalInvoiced !== undefined) updateData.totalInvoiced = totalInvoiced;
    if (paid !== undefined) updateData.paid = paid;
    if (pending !== undefined) updateData.pending = pending;
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);

    const summary = await Summary.findOneAndUpdate(
      { clientId, projectId },
      updateData,
      { new: true }
    );

    if (!summary) {
      return res.status(404).json({ message: 'Summary not found' });
    }

    res.json({ message: 'Summary updated', summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = financeRouter;
