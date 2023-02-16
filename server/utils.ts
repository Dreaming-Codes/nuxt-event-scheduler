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
