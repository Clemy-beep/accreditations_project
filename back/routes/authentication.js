//#region
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const port = 3000;
const { urlencoded, json } = require("body-parser");
const prisma = new PrismaClient();
const upload = multer({ dest: "./uploads/avatars" });
const mail = require("../middleware/mailer");
const bcrypt = require("bcrypt");
const router = express.Router();
//#endregion

router.post("/login", async(req, res) => {
    console.log(req.body);
    let isGoodPassword;
    const { email, pwd } = req.body;
    const user = await prisma.user.findUnique({
        where: { email: email },
    });
    if (user) isGoodPassword = bcrypt.compareSync(pwd, user.password);
    if (!isGoodPassword || !user)
        return res.status(403).json({
            error: "Invalid credentials",
            message: "Email ou mot de passe incorrect",
        });
    try {
        const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
        });
        await prisma.user.update({
            where: {
                email: user.email,
            },
            data: { token: token },
        });
        res.status(200).json({ token: token, user: user });
    } catch (e) {
        console.log(e);
    }
});

router.post("/register", upload.single("avatar"), async(req, res) => {
    const { email, pwd, firstname, lastname, username, dateOfBirth, role } =
    req.body;
    const avatar = req.file.filename;
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{
                    email: email,
                },
                {
                    username: username,
                },
            ],
        },
    });
    const password = bcrypt.hashSync(pwd, 5);
    const date_of_birth = new Date(dateOfBirth);
    const isRestricted = false;
    const token = jwt.sign({
            email,
        },
        process.env.TOKEN_KEY, {
            expiresIn: "2h",
        }
    );

    if (existingUser) {
        return res.status(409).json({
            error: "Existing user",
            message: "Cet utilisateur existe déjà.",
        });
    }
    if (
        pwd.toString().length < 8 ||
        !/\d/.test(pwd) ||
        pwd === pwd.toLowerCase() ||
        pwd === pwd.toUpperCase()
    ) {
        return res.status(400).json({
            error: "Invalid password",
            message: "Votre mot de passe doit contenir au minimum 8 caractères dont une majuscule, une minuscule et un chiffre",
        });
    }
    try {
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
            message: "L'utilisateur n'a pas pu être créé. Merci de réessayer ultérieurement.",
        });
    }
});

module.exports = router;