const dbConfig = require("../configs/db.config.js");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.partner = require("./partner.model.js")(mongoose);
db.token = require("./token.model.js")(mongoose);
db.donation = require("./donation.model.js")(mongoose);
db.admin = require("./admin.model.js")(mongoose);
db.blog = require("./blog.model.js")(mongoose);
db.faq = require("./faq.model.js")(mongoose);

module.exports = db;
