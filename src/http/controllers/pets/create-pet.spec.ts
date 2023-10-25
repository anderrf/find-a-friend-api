import app from '@/app'
import { beforeAll, describe, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrganization } from '@/use-cases/utils/test/create-and-authenticate-organization'
import { prisma } from '@/lib/prisma'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a Pet', async () => {
    const petData = {
      name: 'Nina',
      species: 'Dog',
      size: 2,
      requiredSpace: 2,
      age: 3,
      energyLevel: 2,
      description: 'Black and white dog',
      independenceLevel: 1,
    }
    const { token } = await createAndAuthenticateOrganization(app)
    const response = await request(app.server)
      .post(`/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send(petData)
    expect(response.statusCode).toEqual(201)
    expect(response.body.pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a Pet when not authenticated', async () => {
    const petData = {
      name: 'Nina',
      species: 'Dog',
      size: 2,
      requiredSpace: 2,
      age: 3,
      energyLevel: 2,
      description: 'Black and white dog',
      independenceLevel: 1,
    }
    await request(app.server).post(`/pets`).send(petData).expect(401)
  })
})
