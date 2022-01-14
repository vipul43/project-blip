const dbConfig = require("../configs/db.config.js");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.partner = require("./partner.model.js")(mongoose);

module.exports = db;
