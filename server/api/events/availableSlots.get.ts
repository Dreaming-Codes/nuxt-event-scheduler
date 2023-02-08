import {PrismaClient} from "@prisma/client";
import {getServerSession} from "#auth";
import {checkParams, getSession} from "~/server/utils";

const prisma = new PrismaClient();

export default defineEventHandler(async (event)=>{
    const query = getQuery(event);

    return await prisma.eventUser.groupBy({
        by: ["round", "eventId"],
        where: {
            round: Number(query.round) || undefined,
            eventId: Number(query.eventId) || undefined
        },
        _count: true
    });
})