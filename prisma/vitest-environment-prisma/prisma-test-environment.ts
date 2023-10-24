import { Environment } from 'vitest'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'

function generateDatabaseURL(schema: string) {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }
  const url = new URL(databaseUrl)
  url.searchParams.set('schema', schema)
  return url.toString()
}

const prisma = new PrismaClient()

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)
    process.env.DATABASE_URL = databaseURL
    execSync('npx prisma migrate deploy')
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
