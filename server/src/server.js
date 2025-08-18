import app from './app.js';
import { connectDB } from './config/db.config.js';
import { ENV } from './config/env.config.js';

const PORT = ENV.PORT || 8080;

//* Function to connect DB and start server
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB is ready before server starts
    app.listen(PORT, () => console.info(`✔️ Server is up and running on port: ${PORT}`));
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
