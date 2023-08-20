import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Deleted from './components/Deleted'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ticket-list" element={<TicketList />} />
          <Route path="/create-ticket" element={<TicketForm />} />
          <Route path="/deleted" element={<Deleted />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
