const mongoose = require("mongoose");

const newCase = new mongoose.Schema({
    reporter: String,
    Info: String
});

module.exports = mongoose.model("Cases", newCase);