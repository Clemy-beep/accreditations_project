//#region
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const upload = multer({ dest: "./uploads/posters" });
const auth = require("../middleware/auth");
const { send } = require("process");
const { title } = require("process");
const router = express.Router();
//#endregion

router.post("/add-film", auth, upload.single("poster"), async(req, res) => {
    const {
        title,
        resume,
        casting,
        realisatorFirstname,
        realisatorLastname,
        producerFirstname,
        producerLastname,
        genres,
        budget,
        authorId,
        status,
        critic,
        releaseDate,
    } = req.body;
    if (req.file) var poster = req.file.filename;

    try {
        const response = await prisma.publication.create({
            data: {
                title,
                resume,
                critic,
                status,
                poster,
                relaaseDate: new Date(releaseDate),
                budget: parseFloat(budget),
                author: {
                    connect: {
                        id: parseInt(authorId.toString()),
                    },
                },
                realisator: {
                    connectOrCreate: {
                        create: {
                            firstname: realisatorFirstname,
                            lastname: realisatorLastname,
                        },

                        where: {
                            firstname_lastname: {
                                firstname: realisatorFirstname,
                                lastname: realisatorLastname,
                            },
                        },
                    },
                },
                producer: {
                    connectOrCreate: {
                        create: {
                            firstname: producerFirstname,
                            lastname: producerLastname,
                        },

                        where: {
                            firstname_lastname: {
                                firstname: producerFirstname,
                                lastname: producerLastname,
                            },
                        },
                    },
                },
            },
        });
        if (genres.split(",").length > 0) await updateGenres(genres, title);
        await updateOrCreateCasting(casting, title);
        res.status(200).json(response);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});
router.post("/add-film-poster", auth, async(req, res) => {
    return;
});
router.get("/genres", auth, async(req, res) => {
    const genres = await prisma.genre.findMany();
    res.status(200).json(genres);
});

async function updateGenres(genres, title) {
    var formatedGenres = genres.split(",");
    formatedGenres.forEach(async(genre) => {
        await prisma.filmGenres.create({
            data: {
                filmTitle: title,
                genreId: parseInt(genre),
            },
        });
    });
}

async function updateOrCreateCasting(casting, title) {
    let newCasting = casting.split(",");
    let formatedCasting = [];
    newCasting.forEach((element) => {
        element = element.split(" ");
        formatedCasting.push({
            firstname: element[0],
            lastname: element[1],
        });
    });
    formatedCasting.forEach(async(actor) => {
        let actors = await prisma.actor.findMany({
            where: {
                firstname: actor.firstname,
                lastname: actor.lastname,
            },
        });
        if (actors.length > 0) {
            actors.forEach(async(a) => {
                await prisma.actorsOnFilm.create({
                    data: {
                        actorId: a.id,
                        filmTitle: title,
                    },
                });
            });
            return;
        }
        await prisma.actor.create({
            data: {
                firstname: actor.firstname,
                lastname: actor.lastname,
            },
        });
        let a = await prisma.actor.findFirst({
            where: {
                firstname: actor.firstname,
                lastname: actor.lastname,
            },
        });
        await prisma.actorsOnFilm.create({
            data: {
                actorId: a.id,
                filmTitle: title,
            },
        });
    });
}

router.get("/films/user/:id", auth, async(req, res) => {
    const id = req.params.id;
    try {
        const films = await prisma.publication.findMany({
            where: {
                authorId: parseInt(id),
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
        });
        res.status(200).json({ films });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;