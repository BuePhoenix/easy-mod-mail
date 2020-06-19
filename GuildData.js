const mongoose = require("mongoose");

const newGD = new mongoose.Schema({
    ID: String,
    C: String
});

module.exports = mongoose.model("GuildSettings", newGD);