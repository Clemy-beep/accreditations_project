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
const { body, validationResult } = require("express-validator");

app.use(express.json());
app.use(cors({ origin: ["http://localhost:8080"] }));
app.use(urlencoded({ extended: true }));
app.use(json());

app.post("/register", upload.single("avatar"), async (req, res) => {
  const { email, password, firstname, lastname, username, dateOfBirth, role } =
    req.body;
  console.log(req.file);
  const avatar = req.file.filename;
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  bcrypt.hashSync(password, 5);
  const date_of_birth = new Date(dateOfBirth);
  const isRestricted = false;
  const token = jwt.sign(
    {
      email,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  if (existingUser) {
    return res.status(409).json({
      error: "Existing user",
      message: "This user is already registered",
    });
  }

  try {
    console.log(req.body);
    const response = await prisma.user.create({
      data: {
        email,
        password,
        firstname,
        lastname,
        avatar,
        role,
        token,
        isRestricted,
        username,
        date_of_birth,
      },
    });
    if (response.id)
      mail(
        email,
        "New Account",
        `Welcome to the Curious Movie DataBase (CMDB for short) ${username} ! We hope you have a great time posting, commenting and talking about Direct to DVD movies with some fellows afficionados ! To log in, please click on the following link : http://192.168.1.40/login`
      );
    res.json({ response: response });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "User could not be created. Please try again later.",
    });
  }
});

app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}!`)
);
