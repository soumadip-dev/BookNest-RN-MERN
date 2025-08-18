import app from './app.js';
import { ENV } from './config/env.config.js';

const PORT = ENV.PORT || 8080;

app.listen(PORT, () => {
  console.info(`✔️ Server is up and running on port: ${PORT}`);
});
