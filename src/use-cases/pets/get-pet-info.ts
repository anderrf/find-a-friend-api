import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface GetPetInfoUseCaseRequest {
  petId: string
}

export interface GetPetInfoUseCaseReply {
  pet: Pet
}

export class GetPetInfoUseCase {
  constructor(private petsRepository: PetsRepository) {}

  public async execute({
    petId,
  }: GetPetInfoUseCaseRequest): Promise<GetPetInfoUseCaseReply> {
    const pet = await this.petsRepository.getById(petId)
    if (!pet) {
      throw new ResourceNotFoundError()
    }
    return { pet }
  }
}
