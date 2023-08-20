import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './styles.css'; // Import your styles

const TicketList = ({ tickets, handleDelete, handleUpdate }) => {
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedTicket, setUpdatedTicket] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  const toggleTicketDetails = (ticketNumber) => {
    if (expandedTicket === ticketNumber) {
      setExpandedTicket(null);
    } else {
      setExpandedTicket(ticketNumber);
    }
  };

  const filteredTickets = tickets.filter(
    (ticket) => ticket.name.toString().includes(filterName)
  );

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openUpdateModal = (ticket) => {
    setUpdatedTicket(ticket);
    setShowUpdateModal(true);
    setUpdatedName(ticket.name);
    setUpdatedDescription(ticket.description);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setUpdatedTicket(null);
    setUpdatedName('');
    setUpdatedDescription('');
  };
  const handleUpdateSubmit = async () => {
    if (updatedTicket) {
      const updatedTicketInfo = {
        ...updatedTicket,
        name: updatedName,
        description: updatedDescription,
      };
      // Perform the actual update logic here (e.g., make API call to update ticket)
      try {
        const response = await fetch(`http://localhost:5000/api/tickets/${updatedTicketInfo.ticketNumber}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTicketInfo),
        });
  
        if (response.ok) {
          //Backend responds with updated ticket information
          const updatedTicketResponse = await response.json();
  
          //Update the tickets in frontend state
          const updatedTickets = tickets.map((ticket) =>
            ticket.ticketNumber === updatedTicketResponse.ticketNumber
              ? updatedTicketResponse
              : ticket
          );
          handleUpdate(updatedTickets);
  
          // Close the modal
          closeUpdateModal();
        } else {
          console.error('Failed to update ticket');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="ticket-list">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by Ticket Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </div>
      {currentTickets.map((ticket) => (
        <div key={ticket.ticketNumber} className="ticket-container">
          <div
            className="ticket-header"
            onClick={() => toggleTicketDetails(ticket.ticketNumber)}
          >
            <div className="options-ticket">
              <h2 className="ticket-name">{ticket.name}</h2>
              <div>
                <NavLink className="edit" onClick={() => openUpdateModal(ticket)}>
                  <FontAwesomeIcon icon={faEdit} />
                </NavLink>
                <button className="delete" onClick={() => handleDelete(ticket.ticketNumber)}  >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
          {expandedTicket === ticket.ticketNumber && (
            <div className="ticket-details">
              <p>Id: {ticket.ticketNumber}</p>
              <p>Description: {ticket.description}</p>
              <p>Created Date: {ticket.createdDate}</p>
              <p>Updated Date: {ticket.updatedDate}</p>
              <p>Deleted Date: {ticket.deletedDate}</p>
            </div>
          )}
        </div>
      ))}
      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Ticket</h2>
            <p>Ticket Number: {updatedTicket.ticketNumber}</p>
            <div className="form-row">
              <label className="form-label">
                Name:
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="form-input"
                />
              </label>
            </div>
            <div className="form-row">
              <label className="form-label">
                Description:
                <input
                  type="text"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="form-input"
                />
              </label>
            </div>
            {/* Add input fields for updating ticket details */}
            <button className="modal-button" onClick={handleUpdateSubmit}>
              Update
            </button>
            <button className="modal-button" onClick={closeUpdateModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
