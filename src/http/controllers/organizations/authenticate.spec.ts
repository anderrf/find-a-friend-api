import app from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
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
    await request(app.server).post('/organizations').send(organizationData)
    const response = await request(app.server)
      .post('/organizations/sessions')
      .send({
        email: 'contato@pethelp.org',
        password: 'palpassword',
      })
    // console.log(response)
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
