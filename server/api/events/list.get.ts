import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    return prisma.event.findMany({
        include: {
            RoundMaxUsers: true
        },
        orderBy: {
            name: "asc"
        }
    });
});
