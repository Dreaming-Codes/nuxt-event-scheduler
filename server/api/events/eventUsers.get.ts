import { PrismaClient } from '@prisma/client';
import { getCurrentRound } from '~/server/utils';

const config = useRuntimeConfig();
const prisma = new PrismaClient();

export default defineEventHandler(async() => {
  const round = getCurrentRound(config.EVENT_DAY, config.HOURS, config.HOURS_LENGTH);
  // const eventUsers = await prisma.eventUser.findMany({
  //   where: {
  //     AND: [
  //       { eventId: yourEventId },
  //       { round: yourRound }
  //     ]
  //   },
  //   include: {
  //     user: true
  //   }
  // })
  return;
});
