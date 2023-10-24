import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateOrganizationUseCase } from '@/use-cases/use-cases/organizations/authenticate-organization'

export function MakeAuthenticateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const authenticateOganizationUseCase = new AuthenticateOrganizationUseCase(
    organizationsRepository,
  )
  return authenticateOganizationUseCase
}
