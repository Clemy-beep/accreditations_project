//#region
require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const auth = require("../middleware/auth.js");
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
            id: parseInt(req.params.id),
        },
        include: {
            _count: {
                select: {
                    followedBy: true,
                },
            },
        },
    });
    if (!user) return res.status(404).json({ message: "User not found." });
    delete user.password;
    res.status(200).json(user);
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