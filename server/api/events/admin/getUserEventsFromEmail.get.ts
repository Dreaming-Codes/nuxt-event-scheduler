import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    return await prisma.user.findUnique({
        // @ts-ignore
        where: { email: query.email },
        include: { EventUser: { include: { event: true } } }
    });
});
