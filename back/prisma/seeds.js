const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
    console.log("Starting seeding...");
    await prisma.user.create({
        data: {
            role: "ADMIN",
            username: "Clemy",
            firstname: "Clementine",
            lastname: "Digny",
            email: "clementine.digny@gmail.com",
            date_of_birth: new Date("1994-05-21"),
            password: bcrypt.hashSync("123456", 5),
            avatar: "241758cb7dd290786b5507900a55e8e9",
            isRestricted: false,
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect();
    });