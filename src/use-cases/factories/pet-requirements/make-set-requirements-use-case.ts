import { PrismaPetRequirementsRepository } from '@/repositories/prisma/prisma-pet-requirements-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SetRequirementsUseCase } from '@/use-cases/use-cases/pet-requirements/set-requirements-use-case'

export function makeSetRequirementsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petRequirementsRepository = new PrismaPetRequirementsRepository()
  const setRequirementsUseCase = new SetRequirementsUseCase(
    petsRepository,
    petRequirementsRepository,
  )
  return setRequirementsUseCase
}
