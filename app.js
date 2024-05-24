// Mengimport package
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3100;
const pcRouter = require("./pc_service");

// Supaya API dapat diakses di domain yang berbeda
app.use(cors());

// Buat ngubah request body yang berupa json ke dalam object
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use("/pc", pcRouter);

app.get("/", (req, res) => {
  res.send("Hello from pc-service!");
});

// Menjalankan server di port 3001
app.listen(port, () => console.log("Server terkoneksi pada port " + port));