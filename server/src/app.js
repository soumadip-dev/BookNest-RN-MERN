import express from 'express';

const app = express();

//* Middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//* Home route
app.get('/', (req, res) => {
  res.send('Hello from the BookNest server');
});

//* HealthCheck route
app.post('/api/v1/health', (req, res) => {
  res.status(200).json({ success: true });
});

export default app;
