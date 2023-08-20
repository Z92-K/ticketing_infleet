import React, { useState } from 'react';

const TicketForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the ticket data to the server
    console.log('Submitted:', { title, description });
  };

  return (
    <div className="form" >
      <h2>Add New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button className="button secondary-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TicketForm;
