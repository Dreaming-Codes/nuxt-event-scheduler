import {checkParams, getSession} from "~/server/utils";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


/*
Body:
{imports
    "event_id": 1,
    "round": 1
}
 */
export default defineEventHandler(async (event)=>{
    const body = await readBody(event)

    checkParams(body, ['event_id', 'round'])

    const session = await getSession(event);

    await prisma.eventUser.upsert({
        where: {
            userId_round: {
                // @ts-ignore
                userId: Number(session.user.id),
                round: Number(body['round'])
            }
        },
        update: {
            eventId: Number(body['event_id']),
        },
        create: {
            // @ts-ignore
            userId: Number(session.user.id),
            eventId: Number(body['event_id']),
            round: Number(body['round'])
        }
    })

    return null;
})