import { PrismaClient, User as PrismaUser } from "@prisma/client";

// NOTE: This doesn't work properly

interface User extends PrismaUser {
    id: number;
    interactiveDone: boolean;
}

const prisma = new PrismaClient();

async function assignUsersToLessSubscribedEvents() {
    const users = (await prisma.user.findMany({
        where: {
            interactiveDone: false
        }
    })) as User[];

    for (const user of users) {
        // Iterate over each round
        for (let round = 0; round < 4; round++) {
            const leastSubscribedEvent: [{ eventId: number }] =
                await prisma.$queryRaw`
                SELECT "EventUser"."eventId"
                FROM "EventUser"
                         LEFT JOIN "RoundMaxUsers" ON "EventUser"."round" = "RoundMaxUsers"."round" AND
                                                      "EventUser"."eventId" = "RoundMaxUsers"."eventId"
                WHERE "EventUser"."round" = ${round}
                  AND "EventUser"."eventId" != 42
                GROUP BY "EventUser"."eventId", "RoundMaxUsers"."maxUsers"
                HAVING COUNT("userId") < coalesce("RoundMaxUsers"."maxUsers", 1e9)
                ORDER BY COUNT("userId")
                LIMIT 1`;

            if (leastSubscribedEvent[0] === undefined) {
                console.log(`No event found for round ${round}`);
                continue;
            }

            console.log(
                `Assigning ${user.name} (userId: ${user.id}) to event ${leastSubscribedEvent[0].eventId} for round ${round}`
            );

            if (leastSubscribedEvent[0]?.eventId) {
                await prisma.eventUser.upsert({
                    where: { userId_round: { userId: user.id, round } },
                    update: {},
                    create: {
                        userId: user.id,
                        eventId: leastSubscribedEvent[0].eventId,
                        round
                    }
                });
            }
        }

        console.log(
            `Setting interactiveDone to true for ${user.name} (userId: ${user.id})`
        );

        // set interactiveDone to true
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                interactiveDone: true
            }
        });
    }

    await prisma.$disconnect();
}

assignUsersToLessSubscribedEvents().catch((error) => {
    console.error(error);
    process.exit(1);
});
