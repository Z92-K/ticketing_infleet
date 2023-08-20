// index.js
const express = require('express');
const cors = require('cors');
const app = express();

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'zkukuma@net.com',
    password: 'secure223',
    database: 'ticketing_db',
    port: 3306
  },
});

app.use(cors());
app.use(express.json());

// Create a route to handle ticket creation
app.post('/api/tickets', async (req, res) => {
  try {
    const { name, description } = req.body;
    await knex('tickets').insert({
      name,
      description,
      created_date: new Date().toISOString(),
    });
    res.json({ message: 'Ticket created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.get('/api/deleted', async (req, res) => {
  try {
    const deletedTickets = await knex('tickets')
      .select('*')
      .whereNotNull('deletedDate'); // Retrieve tickets with a deleted date
    res.json(deletedTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.put('/api/tickets/:ticketNumber', async (req, res) => {
  try {
    const ticketNumber = req.params.ticketNumber;
    const { name, description } = req.body;
    await knex('tickets').insert({
      name,
      description,
      updatedDate: new Date().toISOString(),
    });
    res.json({ message: 'Ticket created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
