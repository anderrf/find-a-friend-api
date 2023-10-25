import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { MarkPetAsAdoptedUseCase } from '@/use-cases/use-cases/pets/mark-pet-as-adopted'

export function makeMarkPetAsAdoptedUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const markPetAsAdoptedUseCase = new MarkPetAsAdoptedUseCase(petsRepository)
  return markPetAsAdoptedUseCase
}
