const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);
class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    try {
      const connect = mongoose.connect(MONGO_URI);

      connect.then(() => {
        console.log("Database connection successful");
      });
    } catch (error) {
      console.error("Database connection error:", error);
    }
  }
}

module.exports = new Database();
