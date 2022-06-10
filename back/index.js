require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const app = express();
const port = 3000;
const { urlencoded, json } = require("body-parser");
const prisma = new PrismaClient();
const upload = multer({ dest: "./uploads/avatars" });
const auth = require("./middleware/auth");
const mail = require("./middleware/mailer");
const bcrypt = require("bcrypt");

var authentication = require("./routes/authentication");
var users = require("./routes/user");

app.use(express.json());
app.use(cors({ origin: ["http://localhost:8080"] }));
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api/", authentication);
app.use("/api/", users);

app.listen(port, () =>
    console.log(`🚀 Server ready at: http://localhost:${port}!`)
);