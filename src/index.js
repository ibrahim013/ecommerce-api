import app from './server.js';
import databaseConnection from './database/index.js';
const port = process.env.PORT || 8000;

databaseConnection.getConnect();

app.listen(port, () => {
  console.log(`Server connected at  http://localhost:${port}`);
});
