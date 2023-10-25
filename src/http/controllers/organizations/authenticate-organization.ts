import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { MakeAuthenticateOrganizationUseCase } from '@/use-cases/factories/organizations/make-authenticate-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOrganizationBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })
  const { email, password } = authenticateOrganizationBodySchema.parse(
    request.body,
  )
  try {
    const authenticateUseCase = MakeAuthenticateOrganizationUseCase()
    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    })
    const token = await reply.jwtSign(
      { role: organization.role },
      {
        sign: {
          sub: organization.id,
        },
      },
    )
    const refreshToken = await reply.jwtSign(
      { role: organization.role },
      {
        sign: { sub: organization.id, expiresIn: '7d' },
      },
    )
    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
