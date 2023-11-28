import app from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'

describe('Refresh Token (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
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
    const authResponse = await request(app.server)
      .post('/organizations/sessions')
      .send({ email: 'contato@pethelp.org', password: 'palpassword' })
    const cookies = authResponse.get('Set-Cookie')
    const response = await request(app.server)
      .patch('/organizations/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
