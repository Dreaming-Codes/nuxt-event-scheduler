import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(()=>{
    console.log("Hello World");
    return "test"
})