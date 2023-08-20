import React, { useState, useEffect } from 'react';

const Deleted = () => {
  const [deletedTickets, setDeletedTickets] = useState([]);
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  const toggleTicketDetails = (ticketNumber) => {
    if (expandedTicket === ticketNumber) {
      setExpandedTicket(null);
    } else {
      setExpandedTicket(ticketNumber);
    }
  };

  const filteredTickets = deletedTickets.filter(
    (ticket) => ticket.name.toString().includes(filterName)
  );

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchDeletedTickets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/deleted-tickets');
        if (response.ok) {
          const deletedTicketsData = await response.json();
          setDeletedTickets(deletedTicketsData);
        } else {
          console.error('Failed to fetch deleted tickets');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeletedTickets();
  }, []);

  return (
    <div>
      <h2>Deleted Tickets</h2>
      {deletedTickets.length > 0 ? (
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
                  <h2 className="ticket-name">{ticket.name}</h2> {/* Ticket name on the left */}
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
      ) : (
        <div>No deleted tickets</div>
      )}
    </div>
  );
};

export default Deleted;
