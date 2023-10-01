import { Organization, Pet, Prisma } from '@prisma/client'

export interface SearchManyPetsParams {
  state: string
  city: string
  species?: string
  age?: number
  energyLevel?: number
  size?: number
  requiredSpace?: number
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchManyByCityAndState(
    params: SearchManyPetsParams,
    page?: number,
  ): Promise<Pet[]>
  searchAllByCityAndState(params: SearchManyPetsParams): Promise<Pet[]>
  getById(id: string): Promise<Pet | null>
  markAsAdoptedById(id: string): Promise<Pet>
  activateById(id: string): Promise<Pet>
  deactivateById(id: string): Promise<Pet>
  findOrganizationByOrganizationId(id: string): Promise<Organization | null>
  findOrganizationByPetId(id: string): Promise<Organization | null>
}
