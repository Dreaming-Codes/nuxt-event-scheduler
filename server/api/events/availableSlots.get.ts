import {PrismaClient} from "@prisma/client";
import {getServerSession} from "#auth";
import {checkParams, getSession} from "~/server/utils";

const prisma = new PrismaClient();

export default defineEventHandler(async (event)=>{
    const query = getQuery(event);

    checkParams(query as Record<string, string>, ["round"]);

    if(query.eventId){
        return await prisma.eventUser.groupBy({
            by: ["eventId"],
            where: {
                round: Number(query.round),
                eventId: Number(query.eventId)
            },
            _count: {
                eventId: true
            }
        })
    }

    return await prisma.eventUser.groupBy({
        by: ["eventId"],
        where: {
            round: Number(query.round)
        },
        _count: {
            eventId: true
        }
    })
})