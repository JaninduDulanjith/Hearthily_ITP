import React, { useState } from 'react';
import axios from 'axios';

const LeaveForm = ({ onSubmit }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3500/leave/apply', { id, name, date, reason });
      onSubmit();
    } catch (error) {
      console.error(error);
      alert('Failed to apply leave');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="text" placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
      <button type="submit">Apply Leave</button>
    </form>
  );
};

export default LeaveForm;
