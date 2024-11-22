// routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const Leave = require('../models/leaveModel');

// Route to create a new leave application
router.post('/apply', async (req, res) => {
  try {
    const { empNumber, name, date, reason } = req.body;
    const newLeave = new Leave({ empNumber, name, date, reason });
    await newLeave.save();
    res.status(201).json({ message: 'Leave applied successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all leave applications
router.get('/get', async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get a specific leave application by ID
router.get('/emp/leve:id', async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.empNumber);
    if (!leave) {
      return res.status(404).json({ error: 'Leave not found' });
    }
    res.status(200).json(leave);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to update a leave application by ID
router.put('/emp/leve/update:id', async (req, res) => {
  try {
    const { empNumber, name, date, reason } = req.body;
    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.empNumber,
      { empNumber, name, date, reason },
      { new: true }
    );
    if (!updatedLeave) {
      return res.status(404).json({ error: 'Leave not found' });
    }
    res.status(200).json({ message: 'Leave updated successfully', updatedLeave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all leave applications and count entries related to each empNumber
router.get('/getCount', async (req, res) => {
  try {
    const leaves = await Leave.aggregate([
      {
        $group: {
          _id: "$empNumber",
          totalEntries: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Route to delete a leave application by ID
router.delete('/emp/leve/delete:id', async (req, res) => {
  try {
    const deletedLeave = await Leave.findByIdAndDelete(req.params.id);
    if (!deletedLeave) {
      return res.status(404).json({ error: 'Leave not found' });
    }
    res.status(200).json({ message: 'Leave deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
