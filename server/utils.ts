import { H3Event } from 'h3';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from '#auth';

export async function getSession(event: H3Event): Promise<Awaited<ReturnType<typeof import('#auth').getServerSession>>> {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }
  return session;
}

export function checkParams(params: Record<string, string>, expectedParams: string[]) {
  let missingParams = [];
  if (!params) {
    missingParams = expectedParams;
  } else {
    for (const param of expectedParams) {
      if (params[param] == null) {
        missingParams.push(param);
      }
    }
  }
  if (missingParams.length > 0) {
    throw createError({ statusMessage: `Missing parameters: ${missingParams.join(', ')}`, statusCode: 400 });
  }
}

export function getSlots(prisma: PrismaClient, round = NaN, eventId = NaN, ignoreUser = NaN) {
  return prisma.eventUser.groupBy({
    by: ['round', 'eventId'],
    where: {
      round: isNaN(round) ? undefined : round,
      eventId: isNaN(eventId) ? undefined : eventId,
      userId: isNaN(ignoreUser) ? undefined : { not: ignoreUser }
    },
    _count: true
  });
}

export function getCurrentRound(eventDay: string, hours: string[], hoursLength: number) {
  const startDate = new Date(eventDay);
  let startDay = startDate.getDay() - 1;
  if (startDay === -1) {
    startDay = 6;
  } // Sunday is 6, not 0

  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  let currentDay = now.getDay() - 1;
  if (currentDay === -1) {
    currentDay = 6;
  } // Again, sunday is 6, not 0

  // Parse hours in config
  const parsedHours = [];
  for (const i in hours) {
    const CompleteHour = hours[i].split(':');
    parsedHours.push(Number(CompleteHour[0]) + Number(CompleteHour[1]) / 60);
  }

  if (currentHour - parsedHours[0] < 0) {
    throw createError({ statusMessage: 'User is too early', statusCode: 403 });
  }
  if (currentHour - parsedHours[parsedHours.length - 1] > hoursLength) {
    throw createError({ statusMessage: 'User is too late', statusCode: 403 });
  }

  const roundHour = parsedHours.findIndex((hour) => {
    if (currentHour > hour && currentHour < hour + hoursLength) {
      return true;
    } else {
      return false;
    }
  });

  const roundDay = currentDay - startDay;

  const round = roundDayAndHourToRoundNumber(roundDay, roundHour);

  function roundDayAndHourToRoundNumber(day: number, hour: number) {
    const roundsInADay = hours.length;
    const cycleStart = day * roundsInADay;
    const cyclePosition = hour + 1;
    return cycleStart + cyclePosition;
  }

  return round;
}
