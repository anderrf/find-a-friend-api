import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Pet } from '@prisma/client'
import { InactiveResourceError } from '../errors/inactive-resource-error'

export interface MarkPetAsAdoptedUseCaseRequest {
  petId: string
}

export interface MarkPetAsAdoptedUseCaseReply {
  pet: Pet
}

export class MarkPetAsAdoptedUseCase {
  constructor(private petsRepository: PetsRepository) {}

  public async execute({
    petId,
  }: MarkPetAsAdoptedUseCaseRequest): Promise<MarkPetAsAdoptedUseCaseReply> {
    const petToAdopt = await this.petsRepository.getById(petId)
    if (!petToAdopt) {
      throw new ResourceNotFoundError()
    }
    console.log(petToAdopt)
    if (petToAdopt.adopted_at || !petToAdopt.is_active) {
      throw new InactiveResourceError()
    }
    const adoptedPet = await this.petsRepository.markAsAdoptedById(petId)
    return { pet: adoptedPet }
  }
}
