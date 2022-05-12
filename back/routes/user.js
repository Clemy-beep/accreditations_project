//#region
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const { urlencoded, json } = require("body-parser");
const prisma = new PrismaClient();
const router = express.Router();
const auth = require("../middleware/auth.js");
//#endregion

router.get("/followed-accounts", auth, async(req, res) => {
    if (!req.query)
        return res.status(403).json({ message: "You must provide a user id" });
    const users = await prisma.user.findMany({
        where: {
            following: {
                some: {
                    followedBy: {
                        some: {
                            id: parseInt(req.query.user_id),
                        },
                    },
                },
            },
        },
    });
    if (users.length === 0)
        return res.status(200).json({ message: "No users found." });
    res.status(200).json({ users });
});
router.get("/profile/:id", auth, async(req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id,
        },
    });
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ user });
});

module.exports = router;