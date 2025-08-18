import express from 'express';
import { ENV } from './config/env.config.js';

const app = express();

const PORT = ENV.PORT || 8080;

//* Middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.listen(PORT, () => {
  console.info(`✔️ Server is up and running on port: ${PORT}`);
});
