import { PrismaClient } from '@prisma/client';
import { checkParams, getSession, getSlots } from '~/server/utils';

const prisma = new PrismaClient();

/*
Body:
{imports
    "event_id": 1,
    "round": 1
}
 */
export default defineEventHandler(async(event) => {
  const body = await readBody(event);

  checkParams(body, ['round']);

  const session = await getSession(event);

  // @ts-ignore
  const userId = Number(session.user.id);
  const round = Number(body.round);

  if (body.event_id == null) {
    try {
      await prisma.eventUser.delete({
        where: {
          userId_round: {
            round,
            userId
          }
        }
      });
    } catch (error) {
      // ignoring the error
    }

    return null;
  }

  const eventId = Number(body.event_id);

  const eventObj = (await prisma.event.findFirst({
    where: {
      id: eventId,
      minimumSection: {
        // @ts-ignore
        lte: Number(session.user.section)
      }
    },
    select: {
      maxUsers: true
    }
  }));
  if (!eventObj) {
    throw createError({ statusMessage: `Event with id ${eventId} does not exist`, statusCode: 400 });
  }
  const maxUsers = eventObj.maxUsers;

  const slots = await getSlots(prisma, round, eventId, userId);
  let count = 0;
  if (slots.length > 0) {
    count = slots[0]._count;
  }

  if (count >= maxUsers) {
    throw createError({ statusMessage: `Event with id ${eventId} is full`, statusCode: 400 });
  }

  // This code is using the Prisma library to create or update an entry in a database table called "eventUser". The
  // purpose of this code is to ensure that the "eventUser" table contains an entry with the specified userId, round,
  // and eventId. If an entry with those values already exists, it will be updated, but if it does not exist, a new
  // entry will be created.
  await prisma.eventUser.upsert({
    where: {
      userId_round: {
        userId,
        round
      }
    },
    update: {
      eventId
    },
    create: {
      userId,
      eventId,
      round
    }
  });

  return null;
});
