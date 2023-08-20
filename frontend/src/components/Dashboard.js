// Dashboard.js
import React, { useState } from 'react';
import './styles.css';
import TicketList from './TicketList';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  const [newTicket, setNewTicket] = useState({
    name: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  

  const generateTicketId = () => {
    // A simple approach, you might want to use a more robust method in production
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newId = generateTicketId();

    const updatedTickets = [
      ...tickets,
      {
        ...newTicket,
        createdDate: new Date().toISOString(),
        ticketNumber: newId,
      },
    ];

    setTickets(updatedTickets);
    setNewTicket({ name: '', description: '' });

    try {
      const response = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedTickets,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        // Update state or perform other actions as needed
      } else {
        console.error('Failed to create ticket');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (updatedTicket) => {
    // Implement update logic here (e.g., open a modal with form for updating)
    console.log('Updating ticket:', updatedTicket);
  };

  const handleDelete = async (ticketNumber) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.ticketNumber === ticketNumber ? { ...ticket, deletedDate:
      new Date().toISOString() } : ticket
    );
    setTickets(updatedTickets);
      try {
          const response = await fetch('http://localhost:5000/api/tickets', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...updatedTickets,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            // Update state or perform other actions as needed
          } else {
            console.error('Failed to create ticket');
          }
        } catch (error) {
          console.error(error);
        }
  };
  // const handleDelete = async (ticketNumber) => {
  //   const updatedTickets = tickets.map((ticket) =>
  //     ticket.ticketNumber === ticketNumber
  //       ? { ...ticket, deletedDate: new Date().toISOString() }
  //       : ticket
  //   );

  //   try {
  //     const response = await fetch('http://localhost:5000/api/tickets', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         ...updatedTickets,
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.message);
  //       // Update state or perform other actions as needed
  //     } else {
  //       console.error('Failed to create ticket');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="home-page">
      <h1>Welcome to the Customer Support Ticketing System</h1>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-row">
          <label className="form-label">
            Ticket Name:
            <input
              type="text"
              name="name"
              value={newTicket.name}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-label">
            Description:
            <input
              type="text"
              name="description"
              value={newTicket.description}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-row">
          <button type="submit" className="create-button">
            Create Ticket
          </button>
        </div>
      </form>
      <TicketList
        tickets={tickets.filter((ticket) => !ticket.deletedDate)}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      <NavLink className="nav-button" to={`/deleted`}>
        View Deleted
      </NavLink>
    </div>
  );
};

export default Dashboard;
