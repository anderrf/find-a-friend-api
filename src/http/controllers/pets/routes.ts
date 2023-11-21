import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { createPet } from './create-pet'
import { fetchPets } from './fetch-pets'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    { onRequest: [verifyJWT, verifyUserRole('ORG')] },
    createPet,
  )
  app.get('/pets', fetchPets)
}
