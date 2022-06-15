require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { urlencoded, json } = require("body-parser");

var authentication = require("./routes/authentication");
var users = require("./routes/user");
var films = require("./routes/films");

app.use(express.json());
app.use(cors({ origin: ["http://localhost:8080"] }));
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api/", authentication);
app.use("/api/", users);
app.use("/api/", films);

app.listen(port, () =>
    console.log(`🚀 Server ready at: http://localhost:${port}!`)
);