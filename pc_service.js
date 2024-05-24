// Mengimport package
const express = require("express");
const router = express.Router();
const connection = require("./config");

// [GET] Mengambil daftar game PC
router.get("/", async (req, res) => {
  try {
    // Execute query ke database
    const command = "SELECT * FROM pc";
    const [data] = await connection.promise().query(command);

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil daftar game PC",
      data: data,
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [POST] Memasukkan game PC baru ke daftar game
router.post("/", async (req, res) => {
  try {
    // mengambil name, price, dan rating dari request body
    const { name, price, rating } = req.body;
    // Log the received values for debugging
    console.log("Received:", { name, price, rating });

    // kalau name/price/rating kosong atau gaada kolom name/price/rating di request body
    if (!name || price === undefined || rating === undefined) {
      const missingField = !name ? "Name" : price === undefined ? "Price" : "Rating";
      const msg = `${missingField} gabole kosong 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "INSERT INTO pc (name, price, rating) VALUES (?, ?, ?)";
    await connection.promise().query(command, [name, price, rating]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil menambahkan game PC",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [PUT] Mengubah data game PC berdasarkan id
router.put("/:id", async (req, res) => {
  try {
    // mengambil id dari parameter
    const { id } = req.params;

    // mengambil name, price, dan rating dari request body
    const { name, price, rating } = req.body;

    // kalau name/price/rating kosong atau gaada kolom name/price/rating di request body
    if (!name || price === undefined || rating === undefined) {
      const missingField = !name ? "Name" : price === undefined ? "Price" : "Rating";
      const msg = `${missingField} gabole kosong 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "UPDATE pc SET name = ?, price = ?, rating = ? WHERE id = ?";
    await connection.promise().query(command, [name, price, rating, id]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil mengubah data game PC",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [DELETE] Menghapus data game PC berdasarkan id
router.delete("/:id", async (req, res) => {
  try {
    // mengambil id dari parameter
    const { id } = req.params;

    // Execute query ke database
    const command = "DELETE FROM pc WHERE id = ?";
    await connection.promise().query(command, [id]);

    // mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil menghapus game PC",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
    try {
      // mengambil id dari parameter
      const { id } = req.params;
  
      // Execute query ke database targeting the pc table
      const command = "SELECT * FROM pc WHERE id = ?";
      const [[data]] = await connection.promise().query(command, [id]);
  
      if (!data) {
        const error = new Error("Game PC tidak ditemukan.");
        error.statusCode = 404;
        throw error;
      }
  
      // Mengirimkan respons jika berhasil
      res.status(200).json({
        status: "Success",
        message: "Berhasil mengambil game PC",
        data: data,
      });
    } catch (error) {
      // mengirimkan respons jika gagal
      res.status(error.statusCode || 500).json({
        status: "Error",
        message: error.message,
      });
    }
  });
  

module.exports = router;