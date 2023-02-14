import {PrismaClient} from "@prisma/client";
import fs from "fs/promises";

const prisma = new PrismaClient();

const args = process.argv.slice(2);

async function main(){
    console.log("Import started")
    console.log(args)
    const file = await fs.readFile(args[0], 'utf8');

    const promises = [];

    let parsed = 0;
    let done = 0;

    for (const line of file.split("\n")) {
        const values = line.split(",").map((value) => value.trim());
        parsed++;
        const className = values[1].substring(1, values[1].length).replaceAll('-','');
        const section = parseInt(values[1][0]);
        promises.push(new Promise(async ()=>{
            await prisma.user.upsert({
                where: {
                    email: values[0],
                },
                update: {
                    class: className,
                    section,
                },
                create: {
                    email: values[0],
                    section,
                    class: className,
                }
            });
            done++;
            const percentage = Math.round((done / parsed) * 100);
            console.log(`${done}/${parsed}, ${percentage}%`)
        }));
    }

    await Promise.all(promises);

    console.log("Import completed")
}

main();