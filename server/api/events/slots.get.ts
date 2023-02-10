import {PrismaClient} from "@prisma/client";
import {getSlots} from "~/server/utils";

const prisma = new PrismaClient();

export default defineEventHandler(async (event)=>{
    const query = getQuery(event);

    return await getSlots(prisma, Number(query.round), Number(query.eventId));
})