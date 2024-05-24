const express = require("express");
const cors = require("cors");
const pcRouter = require("./pc");
const port = "3100";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/pc", pcRouter);

app.get("/", (req, res) => {
  res.send("Welcome to PC Service!");
});

app.listen(port, () => {
  console.log("Server Connected on PORT: " + port + "/");
});