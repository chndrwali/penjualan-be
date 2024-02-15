const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middleware untuk membuat folder upload jika belum ada
const createAllFolders = require('./config/uploadFolderCreatScript');

// Memanggil fungsi untuk membuat folder upload
createAllFolders();

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
const productRoutes = require('./routes/products');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/orders');
const customizeRouter = require('./routes/customize');
const categoriesRouter = require('./routes/categories');
const braintreeRouter = require('./routes/braintree');

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);
app.use('/api/customize', customizeRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/braintree', braintreeRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
