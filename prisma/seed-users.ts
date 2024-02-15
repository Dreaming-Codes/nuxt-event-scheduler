import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const args = process.argv.slice(2);

console.log("Import started");
console.log(args);
const file = await fs.readFile(args[0], "utf8");

// const promises = [];

let total = file.split("\n").length;
let done = 0;

for (const line of file.split("\n")) {
    const values = line.split(",").map((value) => value.trim());
    const name = values[2];
    const email = values[3];
    const section = parseInt(values[4]);
    const className = values[5];

    console.log(`Importing ${name} (${email}), section ${section}, class ${className}`);

    // promises.push(
    //     new Promise(async () => {
            await prisma.user.upsert({
                where: {
                    email
                },
                update: {
                    name,
                    class: className,
                    section
                },
                create: {
                    email,
                    name,
                    section,
                    class: className
                }
            });
            done++;
            const percentage = Math.round((done / total) * 100);
            console.log(`${done}/${total}, ${percentage}%`);
    //     })
    // );
}

// await Promise.all(promises);

console.log("Import completed");
