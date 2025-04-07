import express from 'express';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import cors from 'cors';

const app = express();

//* Middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); // Enable CORS

//* Home route
app.get('/', (req, res) => {
  res.send('Hello from the BookNest server');
});

//* HealthCheck route
app.post('/api/v1/health', (req, res) => {
  res.status(200).json({ success: true });
});

//* Auth route
app.use('/api/v1/auth', authRoutes);

//* Book route
app.use('/api/v1/book', bookRoutes);

//* Book Route
app.use('/api/v1/book', bookRoutes);

export default app;
