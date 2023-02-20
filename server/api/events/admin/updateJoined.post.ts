import {PrismaClient} from '@prisma/client';
import {checkParams, getCurrentRoundSafe, getSession} from '~/server/utils';

const config = useRuntimeConfig();
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const round = getCurrentRoundSafe(config.EVENT_DAY, config.HOURS, config.HOURS_LENGTH);

    const session = await getSession(event);

    // @ts-ignore
    if (!session.user.admin) {
        throw createError({statusMessage: 'Unauthorized', statusCode: 401});
    }

    const body = await readBody(event);

    checkParams(body, ['userId']);

    await prisma.eventUser.update({
        where: {
            userId_round: {
                round: round,
                userId: Number(body.userId)
            }
        },
        data: {
            joinedAt: new Date()
        }
    });
    return null;
});
