//#region
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const { urlencoded, json } = require("body-parser");
const prisma = new PrismaClient();
const router = express.Router();
const auth = require("../middleware/auth.js");
const { register } = require("ts-node");
//#endregion

router.get("/user/:id/followed-accounts", auth, async(req, res) => {
    if (!req.params.id)
        return res.status(403).json({ message: "You must provide a user id" });
    const users = await prisma.user.findMany({
        where: {
            followedBy: {
                some: {
                    id: parseInt(req.params.id),
                },
            },
        },
        select: {
            id: true,
            username: true,
        },
    });
    res.status(200).json({ users });
});
router.get("/user/:id", auth, async(req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id,
        },
    });
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ user });
});

router.get("/user/:id/followers", auth, async(req, res) => {
    const followers = await prisma.user.findMany({
        where: {
            following: {
                some: {
                    id: parseInt(req.params.id),
                },
            },
        },
        select: {
            id: true,
            username: true,
            avatar: true,
        },
    });
    if (!followers)
        return res.status(404).json({ message: "Followers not found." });
    res.status(200).json({ followers });
});

router.get("/user/:id/avatar", auth, async(req, res) => {
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
            `/home/clemy/Documents/accreditations_project/back/uploads/avatars/${avatar.avatar}`
        );
});

module.exports = router;