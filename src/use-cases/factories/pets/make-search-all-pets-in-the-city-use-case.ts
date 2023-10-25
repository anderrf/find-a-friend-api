import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchAllPetsInTheCityUseCase } from '@/use-cases/use-cases/pets/search-all-pets-in-the-city'

export function makeSearchAllPetsInTheCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const searchAllPetsInTheCityUseCase = new SearchAllPetsInTheCityUseCase(
    petsRepository,
  )
  return searchAllPetsInTheCityUseCase
}
