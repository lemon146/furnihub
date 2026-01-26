import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello this is blala",
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
