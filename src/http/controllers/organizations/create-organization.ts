import { makeCreateOrganizationUseCase } from '@/use-cases/factories/organizations/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    responsibleName: z.string(),
    state: z.string(),
    city: z.string(),
    address: z.string(),
    postalCode: z.string(),
    email: z.string(),
    mobilePhoneNumber: z.string(),
    password: z.string(),
  })
  const {
    name,
    responsibleName,
    state,
    city,
    address,
    postalCode,
    email,
    mobilePhoneNumber,
    password,
  } = createOrganizationBodySchema.parse(request.body)
  const createOrganizationUseCase = makeCreateOrganizationUseCase()
  await createOrganizationUseCase.execute({
    name,
    responsibleName,
    state,
    city,
    address,
    postalCode,
    email,
    mobilePhoneNumber,
    password,
  })
  return reply.status(201).send()
}
