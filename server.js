const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");

app.listen(PORT, function() {
  console.log("Now listening on port 3000");
});