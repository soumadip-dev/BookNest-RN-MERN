import express from 'express';
import { ENV } from './config/env.config.js';

const app = express();

const PORT = ENV.PORT || 8080;

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

app.listen(PORT, () => {
  console.info(`✔️ Server is up and running on port: ${PORT}`);
});
