import { makeRegisterPetUseCase } from '@/use-cases/factories/pets/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    description: z.string().nullish(),
    species: z.string(),
    requiredSpace: z.number().int(),
    energyLevel: z.number().int(),
    independenceLevel: z.number().int(),
    age: z.number().int(),
    size: z.number().int(),
  })

  const {
    name,
    species,
    description,
    requiredSpace,
    energyLevel,
    independenceLevel,
    age,
    size,
  } = registerPetBodySchema.parse(request.body)
  const registerPetUseCase = makeRegisterPetUseCase()
  const { pet } = await registerPetUseCase.execute({
    name,
    species,
    description: description ?? undefined,
    requiredSpace,
    energyLevel,
    independenceLevel,
    age,
    size,
    organizationId: request.user.sub,
  })
  return reply.status(201).send({ pet })
}
