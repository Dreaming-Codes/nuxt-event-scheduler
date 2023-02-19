import { PrismaClient } from '@prisma/client';
import { getCurrentRound } from '~/server/utils';

const config = useAppConfig();
const prisma = new PrismaClient();

export default defineEventHandler(async() => {
  const round = await getCurrentRound(config.EVENT_DAY, config.HOURS, config.HOURS_LENGTH);
});
