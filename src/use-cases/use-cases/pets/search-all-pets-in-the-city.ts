import { PetsRepository } from '@/repositories/pets-repository'
import { RequiredLocationError } from '@/use-cases/errors/required-location-error'
import { Pet } from '@prisma/client'

export interface SearchAllPetsInTheCityUseCaseRequest {
  state: string
  city: string
  species?: string
  age?: number
  energyLevel?: number
  size?: number
  requiredSpace?: number
  independenceLevel?: number
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
    independenceLevel,
  }: SearchAllPetsInTheCityUseCaseRequest): Promise<SearchAllPetsInTheCityUseCaseReply> {
    if (!city || !state) {
      throw new RequiredLocationError()
    }
    const pets = await this.petsRepository.searchAllByCityAndState({
      city,
      state,
      species,
      age,
      energyLevel,
      size,
      requiredSpace,
      independenceLevel,
    })
    return {
      pets,
      count: pets.length,
    }
  }
}
