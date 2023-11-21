import { RequiredLocationError } from '@/use-cases/errors/required-location-error'
import { makeSearchAllPetsInTheCityUseCase } from '@/use-cases/factories/pets/make-search-all-pets-in-the-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    state: z.string(),
    city: z.string(),
    species: z.string().nullish(),
    age: z.coerce.number().nullish(),
    energyLevel: z.coerce.number().nullish(),
    size: z.coerce.number().nullish(),
    requiredSpace: z.coerce.number().nullish(),
    independenceLevel: z.coerce.number().nullish(),
  })
  try {
    const {
      state,
      city,
      species,
      age,
      energyLevel,
      size,
      requiredSpace,
      independenceLevel,
    } = fetchPetsQuerySchema.parse(request.query)
    const searchAllPetsUseCase = makeSearchAllPetsInTheCityUseCase()
    const { pets, count } = await searchAllPetsUseCase.execute({
      state,
      city,
      species: species || undefined,
      age: age || undefined,
      energyLevel: energyLevel || undefined,
      size: size || undefined,
      requiredSpace: requiredSpace || undefined,
      independenceLevel: independenceLevel || undefined,
    })
    return reply.status(200).send({ pets, count })
  } catch (err) {
    if (err instanceof RequiredLocationError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
