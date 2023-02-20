import {PrismaClient} from '@prisma/client';
import {checkParams, getSession} from '~/server/utils';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const session = await getSession(event);

    // @ts-ignore
    if (!session.user.admin) {
        throw createError({statusMessage: 'Unauthorized', statusCode: 401});
    }

    const query = getQuery(event) as Record<string, string>;

    checkParams(query, ['eventId']);

    //const round = getCurrentRound(config.EVENT_DAY, config.HOURS, config.HOURS_LENGTH);
    const round = 1;

    const eventId = Number(query.eventId);

    if (isNaN(eventId)) {
        throw createError({statusMessage: 'EventId should be a number', statusCode: 400});
    }


    return {
        round,
        users: await prisma.eventUser.findMany({
            where: {
                round: round,
                eventId: eventId
            },
            select: {
                user: {
                    select: {
                        name: true,
                        section: true,
                        class: true
                    }
                },
                joinedAt: true,
            }
        })
    };
});
