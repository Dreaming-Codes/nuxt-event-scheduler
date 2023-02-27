import { PrismaClient } from "@prisma/client";
import { checkParams, getSession } from "~/server/utils";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const session = await getSession(event);

    // @ts-ignore
    if (!session.user.admin) {
        throw createError({ statusMessage: "Unauthorized", statusCode: 401 });
    }

    const body = await readBody(event);

    checkParams(body, ["userId", "present", "round"]);

    const round = parseInt(body.round);
    const userId = parseInt(body.userId);

    if (isNaN(round) || isNaN(userId)) {
        throw createError({
            statusMessage: "Invalid round or user ID",
            statusCode: 400
        });
    }

    await prisma.eventUser.update({
        where: {
            userId_round: {
                round,
                userId
            }
        },
        data: {
            joinedAt: body.present ? new Date() : null
        }
    });
    return null;
});
