import { PetRequirement } from '@prisma/client'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { PetsRepository } from '../../../repositories/pets-repository'
import { PetRequirementsRepository } from '@/repositories/pet-requirements-repository'

export interface SetRequirementsUseCaseRequest {
  petId: string
  requirements: string[]
}

export interface SetRequirementsUseCaseReply {
  requirements: PetRequirement[]
}

export class SetRequirementsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private petRequirementsRepository: PetRequirementsRepository,
  ) {}

  public async execute({
    petId,
    requirements,
  }: SetRequirementsUseCaseRequest): Promise<SetRequirementsUseCaseReply> {
    const pet = await this.petsRepository.getById(petId)
    if (!pet) {
      throw new ResourceNotFoundError()
    }
    await this.petRequirementsRepository.eraseAllByPetId(petId)
    const addedRequirements = await this.petRequirementsRepository.setByPetId(
      petId,
      requirements.map((requirement) => {
        return {
          requirement,
          pet_id: petId,
        }
      }),
    )
    return {
      requirements: addedRequirements,
    }
  }
}
