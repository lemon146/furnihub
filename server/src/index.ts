import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import dbConnection from "./config/db.connection";

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
