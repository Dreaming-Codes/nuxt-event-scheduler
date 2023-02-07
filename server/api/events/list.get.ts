import {PrismaClient} from "@prisma/client";
import {getServerSession} from "#auth";
import {getSession} from "~/server/utils";

const prisma = new PrismaClient();

export default defineEventHandler(async (event)=>{
    return await prisma.event.findMany();
})