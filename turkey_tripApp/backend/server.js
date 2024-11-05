const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'db',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelien AI'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Import routes
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Use routes with /api prefix
app.use('/api', blogRoutes);
app.use('/api', commentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
