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
const upload = multer({ dest: "./uploads/posters" });
//#endregion

router.post("/add-film", auth, async(req, res) => {
    const {
        title,
        resume,
        casting,
        realisator,
        producer,
        genres,
        budget,
        poster,
        author,
        status,
        critic,
    } = req.body;

    console.log(req.body);
});

router.get("/genres", auth, async(req, res) => {
    const genres = await prisma.genre.findMany();
    res.json(genres);
});

module.exports = router;