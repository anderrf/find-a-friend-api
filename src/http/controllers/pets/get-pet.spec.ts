import { beforeAll, describe, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import app from '@/app'

describe('Get Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
    await prisma.organization.createMany({
      data: [
        {
          name: 'Animal Pal',
          city: 'Mongaguá',
          state: 'São Paulo',
          address: 'Av Marina, 999',
          responsible_name: 'Marcos Janeiro',
          email: 'contato@animalpal.org',
          mobile_phone_number: '13777778888',
          postal_code: '11730000',
          password_hash: await hash('palpassword', 6),
          id: 'org-01',
        },
        {
          name: 'Pet Help',
          city: 'Santos',
          state: 'São Paulo',
          address: 'Av São Paulo, 876',
          responsible_name: 'Carlos Robson',
          email: 'contato@pethelp.org',
          mobile_phone_number: '13111112222',
          postal_code: '11730000',
          password_hash: await hash('pethelper50', 6),
          id: 'org-02',
        },
      ],
    })
    await prisma.pet.createMany({
      data: [
        {
          name: 'Nina',
          species: 'Dog',
          size: 2,
          required_space: 2,
          age: 3,
          energy_level: 2,
          description: 'Black and white dog',
          independence_level: 1,
          organization_id: 'org-01',
          id: 'pet-01',
        },
        {
          name: 'Toby',
          species: 'Dog',
          size: 1,
          required_space: 2,
          age: 3,
          energy_level: 1,
          description: 'Black and white dog',
          independence_level: 1,
          organization_id: 'org-02',
          id: 'pet-02',
        },
        {
          name: 'Nina',
          species: 'Cat',
          size: 1,
          required_space: 1,
          age: 1,
          energy_level: 3,
          description: 'Orange cat',
          independence_level: 2,
          organization_id: 'org-01',
          id: 'pet-03',
        },
        {
          name: 'Toby',
          species: 'Dog',
          size: 1,
          required_space: 2,
          age: 3,
          energy_level: 1,
          description: 'Black and white dog',
          independence_level: 1,
          organization_id: 'org-02',
          id: 'pet-04',
          is_active: false,
        },
      ],
    })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a registered pet', async () => {
    const response = await request(app.server).get(`/pet/pet-01`).send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: 'pet-01',
      }),
    )
  })

  it('should not be able to get an unregistered pet', async () => {
    const response = await request(app.server).get(`/pet/pet-05`).send()
    expect(response.statusCode).toEqual(404)
  })

  it('should be able to get an inactive pet when user is the organization responsible for it', async () => {
    const authResponse = await request(app.server)
      .post('/organizations/sessions')
      .send({
        email: 'contato@pethelp.org',
        password: 'pethelper50',
      })
    const { token } = authResponse.body
    const response = await request(app.server)
      .get(`/pet/pet-04`)
      .set('Authorization', `Bearer ${token}`)
      .send()
    console.log(response.body.message)
    expect(response.statusCode).toEqual(200)
  })

  it('should not be able to get an inactive pet when user is not the organization responsible for it', async () => {
    const authResponse = await request(app.server)
      .post('/organizations/sessions')
      .send({
        email: 'contato@animalpal.org',
        password: 'palpassword',
      })
    const { token } = authResponse.body
    const response = await request(app.server)
      .get(`/pet/pet-04`)
      .set('Authorization', `Bearer ${token}`)
      .send()
    console.log(response.body.message)
    expect(response.statusCode).toEqual(409)
  })
})
