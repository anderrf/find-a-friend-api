import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface RegisterPetUseCaseRequest {
  name: string
  description?: string
  species: string
  requiredSpace: number
  energyLevel: number
  indepenceLevel: number
  age: number
  size: number
  organizationId: string
}
export interface RegisterPetUseCaseReply {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  public async execute({
    name,
    description,
    species,
    requiredSpace,
    energyLevel,
    indepenceLevel,
    age,
    size,
    organizationId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseReply> {
    const organization =
      await this.petsRepository.findOrganizationByOrganizationId(organizationId)
    if (!organization) {
      throw new ResourceNotFoundError()
    }
    const pet = await this.petsRepository.create({
      name,
      description,
      species,
      size,
      age,
      required_space: requiredSpace,
      energy_level: energyLevel,
      independence_level: indepenceLevel,
      organization_id: organizationId,
    })
    return { pet }
  }
}
