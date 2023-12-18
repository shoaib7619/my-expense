const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/connection');
const path = require('path');

dotenv.config();

// Database connection
connectDb();

// Rest object
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes for user
app.use('/api/v1/users', require('./routes/userRoutes'));

// Transactions routes
app.use('/api/v1/transactions', require('./routes/transactionsRoutes'));

// Serve static files
app.use(express.static(path.join(__dirname, './client/build')));

// Catch-all route for serving React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Port
const PORT = process.env.PORT || 8080;

// Listen function
app.listen(PORT, () => {
  console.log(`Daily Expense Management is listening on port http://localhost:${PORT}`);
});
