//#region
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const upload = multer({ dest: "./uploads/posters" });
const auth = require("../middleware/auth");
const router = express.Router();
//#endregion

router.get("/week-movies", auth, async(req, res) => {
    const date = new Date();
    const lastWeek = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 7
    );
    try {
        let movies = await prisma.publication.findMany({
            where: {
                AND: [{
                        createdAt: {
                            gte: lastWeek,
                        },
                    },
                    {
                        status: "accepted",
                    },
                ],
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        followedBy: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
                realisator: {
                    select: {
                        firstname: true,
                        lastname: true,
                    },
                },
                producer: {
                    select: {
                        firstname: true,
                        lastname: true,
                    },
                },
                casting: {
                    select: {
                        actor: {
                            select: {
                                firstname: true,
                                lastname: true,
                            },
                        },
                    },
                },
                genres: {
                    select: {
                        genre: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        res.status(200).json(movies);
    } catch (e) {
        res.status(500).send(e);
    }
});

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
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(authorId.toString()),
            },
        });
        if (user.isRestricted === false)
            res.status(403).json({ message: "Vous n'êtes pas autorisé à publier." });
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
    if (newCasting.length < 1) return;
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

router.get("/films/:id", auth, async(req, res) => {
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
                        followedBy: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
                realisator: {
                    select: {
                        firstname: true,
                        lastname: true,
                    },
                },
                producer: {
                    select: {
                        firstname: true,
                        lastname: true,
                    },
                },
                casting: {
                    select: {
                        actor: {
                            select: {
                                firstname: true,
                                lastname: true,
                            },
                        },
                    },
                },
                genres: {
                    select: {
                        genre: {
                            select: {
                                name: true,
                            },
                        },
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

router.get("/films/poster/:id", auth, async(req, res) => {
    const poster = await prisma.publication.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
        select: {
            poster: true,
        },
    });
    res
        .type("jpeg")
        .sendFile(
            `/home/clemy/Documents/accreditations_project/back/uploads/posters/${poster.poster}`
        );
});

module.exports = router;