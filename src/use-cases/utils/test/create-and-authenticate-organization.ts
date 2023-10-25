import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: 'Animal Pal',
      city: 'Mongaguá',
      state: 'São Paulo',
      address: 'Av Marina, 999',
      responsible_name: 'Marcos Janeiro',
      email: 'contato@pethelp.org',
      mobile_phone_number: '13777778888',
      postal_code: '11730000',
      password_hash: await hash('palpassword', 6),
      id: 'org-01',
    },
  })
  const authResponse = await request(app.server)
    .post('/organizations/sessions')
    .send({
      email: 'contato@pethelp.org',
      password: 'palpassword',
    })
  const { token } = authResponse.body
  return { token }
}
