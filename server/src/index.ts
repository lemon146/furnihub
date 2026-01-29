import dotenv from "dotenv";
import { app } from "./app";
import dbConnection from "./config/db.connection";

dotenv.config();
dbConnection()
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`server is running at port ${port}`);
    });
  })
  .catch((error) => {
    console.log("DATABASE connection error", error);
  });
