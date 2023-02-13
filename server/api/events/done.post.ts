import {getSession} from "~/server/utils";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event)=>{
    const session = await getSession(event);

    await prisma.user.update({
        where: {
            // @ts-ignore
            id: Number(session.user.id)
        },
        data: {
            interactiveDone: true
        }
    })

    return null;
})