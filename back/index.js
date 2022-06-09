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

app.get("/api/user/:id/avatar", auth, async(req, res) => {
    const avatar = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
        select: {
            avatar: true,
        },
    });
    res
        .type("jpeg")
        .sendFile(
            `/home/stagiaire8/accreditations_project/back/uploads/avatars/${avatar.avatar}`
        );
});

app.listen(port, () =>
    console.log(`🚀 Server ready at: http://localhost:${port}!`)
);