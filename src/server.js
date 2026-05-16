import connection from "./config/db.js";
import app from "./index.js";

const PORT = 5000;

const startServer = async () => {
  try {
    await connection(); // wait for DB
    app.listen(PORT, () => {
      console.log("server is running on:", PORT);
    });
  } catch (error) {
    console.log("Server failed to start");
  }
};

startServer();
