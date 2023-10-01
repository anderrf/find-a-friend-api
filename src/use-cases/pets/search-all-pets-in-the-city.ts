import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

export interface SearchAllPetsInTheCityUseCaseRequest {
  state: string
  city: string
  species?: string
  age?: number
  energyLevel?: number
  size?: number
  requiredSpace?: number
}

export interface SearchAllPetsInTheCityUseCaseReply {
  pets: Pet[]
  count: number
}

export class SearchAllPetsInTheCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  public async execute({
    state,
    city,
    species,
    age,
    energyLevel,
    size,
    requiredSpace,
  }: SearchAllPetsInTheCityUseCaseRequest): Promise<SearchAllPetsInTheCityUseCaseReply> {
    const pets = await this.petsRepository.searchAllByCityAndState({
      city,
      state,
      species,
      age,
      energyLevel,
      size,
      requiredSpace,
    })
    return {
      pets,
      count: pets.length,
    }
  }
}
