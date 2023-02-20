import {PrismaClient} from '@prisma/client';
import {checkParams, getSession} from '~/server/utils';
import {getCurrentRoundSafe} from "~/shared/utils";

const config = useRuntimeConfig();
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const round = getCurrentRoundSafe(config.EVENT_DAY, config.HOURS, config.HOURS_LENGTH);

    const session = await getSession(event);

    // @ts-ignore
    if (!session.user.admin) {
        throw createError({statusMessage: 'Unauthorized', statusCode: 401});
    }

    const query = getQuery(event) as Record<string, string>;

    checkParams(query, ['eventId']);

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
                        id: true,
                        section: true,
                        class: true,
                        email: true
                    }
                },
                joinedAt: true,
            }
        })
    };
});
