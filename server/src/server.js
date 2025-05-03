import express from 'express';
import { ENV } from './config/env.config';

const app = express();

const PORT = ENV.PORT || 8080;

app.listen(PORT, () => {
  console.info(`✔️ Server is up and running on port: ${PORT}`);
});
