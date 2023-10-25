import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetInfoUseCase } from '@/use-cases/use-cases/pets/get-pet-info'

export function makeGetPetInfoUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetInfoUseCase = new GetPetInfoUseCase(petsRepository)
  return getPetInfoUseCase
}
