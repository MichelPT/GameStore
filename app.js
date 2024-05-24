// Mengimport package
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3100;
const ps4Router = require("./ps4");

// Supaya API dapat diakses di domain yang berbeda
app.use(cors());

// Buat ngubah request body yang berupa json ke dalam object
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use("/ps4", ps4Router);

app.get("/", (req, res) => {
  res.send("Hello from ps4-service! ");
});

// Menjalankan server di port 3001
app.listen(port, () => console.log("Server terkoneksi pada port " + port));