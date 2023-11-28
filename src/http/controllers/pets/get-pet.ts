import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetInfoUseCase } from '@/use-cases/factories/pets/make-get-pet-info-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string(),
  })
  try {
    const { petId } = getPetParamsSchema.parse(request.params)
    const getPetInfoUseCase = makeGetPetInfoUseCase()
    const { pet } = await getPetInfoUseCase.execute({
      petId,
    })
    try {
      await request.jwtVerify()
    } catch (err) {}
    if (!request.user?.sub) {
      return reply.status(200).send({ pet })
    }
    if (pet.organization_id !== request.user.sub && !pet.is_active) {
      return reply.status(409).send({ message: 'Inactive' })
    }
    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    throw err
  }
}
