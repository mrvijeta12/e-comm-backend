import connection from "./config/db.js";
import app from "./index.js";
import connection from "./config/db.js";
//! for local host
const PORT = 5000;
const startServer = async () => {
  try {
    console.log("Starting server...");
    await connection(); // wait for DB
    app.listen(PORT, () => {
      console.log("server is running on:", PORT);
    });
  } catch (error) {
    console.log("Server failed to start", error.message);
    process.exit(1);
  }
};

startServer();
