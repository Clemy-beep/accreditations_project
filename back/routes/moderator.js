//#region
require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const auth = require("../middleware/auth");
const { response } = require("express");
const router = express.Router();
//#endregion

router.get("/moderate/:id/waiting-films", auth, async(req, res) => {
    let moderator = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (moderator.role !== "MODERATOR")
        res
        .status(403)
        .json({ message: "Vous n'êtes pas autorisé à modérer des fiches" });
    try {
        let movies = await prisma.publication.findMany({
            where: {
                status: "waiting",
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        _count: {
                            select: {
                                followedBy: true,
                            },
                        },
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
    } catch (error) {
        console.log(error);
    }
});

router.patch("/moderate/add-moderator/:id/:filmid", auth, async(req, res) => {
    let moderator = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (moderator.role !== "MODERATOR")
        res
        .status(403)
        .json({ message: "Vous n'êtes pas autorisé à modérer des fiches" });
    try {
        await prisma.publication.update({
            where: {
                id: parseInt(req.params.filmid),
            },
            data: {
                moderatorId: moderator.id,
            },
        });
        response.status(200).json("moderatorId", moderator.id);
    } catch (e) {
        res.status(500).json({ message: error });
    }
});

router.patch("/moderate/:id/refuse/:filmid", auth, async(req, res) => {
    let moderator = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    try {
        if (moderator.role !== "MODERATOR")
            throw "Vous n'êtes pas autorisé à modérer des fiches.";
        await prisma.publication.update({
            where: {
                id: parseInt(req.params.filmid),
            },
            data: {
                status: "refused",
                moderatorId: parseInt(req.params.id),
            },
        });
        res.status(200).json({ message: "Fiche modifiée" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.patch("/moderate/:id/accept/:filmid", auth, async(req, res) => {
    let moderator = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (moderator.role !== "MODERATOR")
        res
        .status(403)
        .json({ message: "Vous n'êtes pas autorisé à modérer des fiches" });
    try {
        let mov = await prisma.publication.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        await prisma.publication.update({
            where: {
                id: parseInt(req.params.filmid),
            },
            data: {
                status: "accepted",
                isOpenToComment: true,
                moderatorId: parseInt(req.params.id),
            },
        });
        res.status(200).json({ message: "Fiche modifiée" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});

module.exports = router;