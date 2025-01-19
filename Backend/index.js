const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const  {connectDB}  = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
