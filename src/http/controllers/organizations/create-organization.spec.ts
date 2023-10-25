import app from '@/app'
import { beforeAll, describe, afterAll, it, expect } from 'vitest'
import request from 'supertest'

describe('Create Organization (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a Organization', async () => {
    const organizationData = {
      name: 'Animal Pal',
      city: 'Mongaguá',
      state: 'São Paulo',
      address: 'Av Marina, 999',
      responsibleName: 'Marcos Janeiro',
      email: 'contato@pethelp.org',
      mobilePhoneNumber: '13777778888',
      postalCode: '11730000',
      password: 'palpassword',
    }
    const response = await request(app.server)
      .post('/organizations')
      .send(organizationData)
    expect(response.statusCode).toEqual(201)
  })
})
