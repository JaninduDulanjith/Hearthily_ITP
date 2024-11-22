const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  empNumber: String,
  name: String,
  date: Date,
  reason: String
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;