import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { CreateOrganizationUseCase } from '@/use-cases/use-cases/organizations/create-organization'

export function makeCreateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const createOganizationUseCase = new CreateOrganizationUseCase(
    organizationsRepository,
  )
  return createOganizationUseCase
}
