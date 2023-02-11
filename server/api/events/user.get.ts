import {PrismaClient} from "@prisma/client";
import {getSession, getSlots} from "~/server/utils";
import {QueryValue} from "ufo";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const session = await getSession(event);

    const query = getQuery(event);

    let round: number[] | undefined = undefined;

    if (query.hasOwnProperty("round")) {
        if (!Array.isArray(query.round)) {
            const parsedRound = Number(query.round);
            if (isNaN(parsedRound)) {
                throw createError({statusMessage: `Round should be a number`, statusCode: 400})
            }
            round = [parsedRound];
        } else {
            round = (query.round as QueryValue[]).map((round) => Number(round));
        }
    }

    return prisma.eventUser.findMany({
        select: {
            round: true, eventId: true,
        }, where: {
            // @ts-ignore
            userId: session.user.id, round: round ? {in: round} : undefined,
        }
    })
})