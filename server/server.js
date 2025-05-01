import express from 'express';

const app = express();

const PORT = 8080;

app.listen(PORT, () => {
  console.info(`✔️ Server is up and running on port: ${PORT}`);
});
