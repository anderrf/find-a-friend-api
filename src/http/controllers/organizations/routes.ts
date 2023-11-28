import { FastifyInstance } from 'fastify'
import { createOrganization } from './create-organization'
import { authenticateOrganization } from './authenticate-organization'
import { refresh } from './refresh'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', createOrganization)
  app.post('/organizations/sessions', authenticateOrganization)
  app.patch('/organizations/token/refresh', refresh)
}
