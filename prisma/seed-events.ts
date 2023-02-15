import fs from 'fs/promises'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const args = process.argv.slice(2)

console.log('Import started')
console.log(args)
const file = await fs.readFile(args[0], 'utf8')

const promises = []

let parsed = 0
let done = 0

for (const line of file.split('\n')) {
  const values = line.split('\t').map(value => value.trim())
  parsed++
  promises.push(new Promise(async () => {
    await prisma.event.create({
      data: {
        name: `[${values[0]}] ${values[1]}`,
        description: values[2],
        maxUsers: parseInt(values[3]) || 0
      }
    })
    done++
    const percentage = Math.round((done / parsed) * 100)
    console.log(`${done}/${parsed}, ${percentage}%`)
  }))
}

await Promise.all(promises)

console.log('Import completed')
