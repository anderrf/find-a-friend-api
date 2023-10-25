import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { createPet } from './create-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    { onRequest: [verifyJWT, verifyUserRole('ORG')] },
    createPet,
  )
}
