import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(()=>{
    console.log(process.versions.node)
    console.log("Hello World");
    return "test"
})