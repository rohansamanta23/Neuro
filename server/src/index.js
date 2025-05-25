import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/index.db.js";

dotenv.config();

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("Server error:", err);
      process.exit(1);
    });
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port http://localhost:${process.env.PORT}/`
      );
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
    process.exit(1);
  });
