const mysql = require("mysql2");

const config = {
  host: "34.133.174.237",
  user: "root",
  password: "-[V/%8;7jgGe,frr",
  database: "gamesdb",
};

const connect = mysql.createConnection(config);

// Koneksi DB
connect.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = connect;