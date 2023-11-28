import { SearchManyPetsParams } from './../pets-repository'
import { Organization, Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private organizationsRepository: OrganizationsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const newItemsLength = this.items.push({
      id: data.id || randomUUID(),
      registered_at: data.registered_at
        ? new Date(data.registered_at)
        : new Date(),
      energy_level: data.energy_level,
      required_space: data.required_space,
      independence_level: data.independence_level,
      is_active: data.is_active ? data.is_active : true,
      organization_id: data.organization_id,
      size: data.size,
      species: data.species,
      description: data.description ? data.description : null,
      name: data.name,
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      age: data.age,
    })
    return this.items[newItemsLength - 1]
  }

  async searchManyByCityAndState(
    {
      state,
      city,
      species,
      age,
      energyLevel,
      size,
      requiredSpace,
    }: SearchManyPetsParams,
    page = 1,
  ): Promise<Pet[]> {
    const organizationsInLocation =
      await this.organizationsRepository.findAllByCityAndState(city, state)
    return this.items
      .filter((item) =>
        organizationsInLocation.find(
          (organization) => organization.id === item.id,
        ) && age
          ? item.age === age
          : true && energyLevel
          ? item.energy_level === energyLevel
          : true && size
          ? item.size === size
          : true && requiredSpace
          ? item.required_space === requiredSpace
          : true && species
          ? item.species === species
          : true && item.is_active,
      )
      .slice((page - 1) * 20, page * 20)
  }

  async searchAllByCityAndState({
    state,
    city,
    species,
    age,
    energyLevel,
    size,
    requiredSpace,
    independenceLevel,
  }: SearchManyPetsParams): Promise<Pet[]> {
    const organizationsInLocation =
      await this.organizationsRepository.findAllByCityAndState(city, state)
    return this.items.filter((item) =>
      organizationsInLocation.find(
        (organization) => organization.id === item.id,
      ) && age
        ? item.age === age
        : true && energyLevel
        ? item.energy_level === energyLevel
        : true && size
        ? item.size === size
        : true && requiredSpace
        ? item.required_space === requiredSpace
        : true && species
        ? item.species === species && independenceLevel
          ? item.independence_level
          : true
        : true && item.is_active,
    )
  }

  async getById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)
    return pet || null
  }

  async markAsAdoptedById(id: string): Promise<Pet> {
    const petIndex = this.items.findIndex((item) => item.id === id)
    this.items[petIndex].adopted_at = new Date()
    this.items[petIndex].is_active = false
    return this.items[petIndex]
  }

  async activateById(id: string): Promise<Pet> {
    const petIndex = this.items.findIndex((item) => item.id === id)
    this.items[petIndex].is_active = true
    return this.items[petIndex]
  }

  async deactivateById(id: string): Promise<Pet> {
    const petIndex = this.items.findIndex((item) => item.id === id)
    this.items[petIndex].is_active = false
    return this.items[petIndex]
  }

  async findOrganizationByOrganizationId(
    id: string,
  ): Promise<Organization | null> {
    const organization = await this.organizationsRepository.findById(id)
    return organization || null
  }

  async findOrganizationByPetId(id: string): Promise<Organization | null> {
    const pet = this.items.find((item) => item.id === id)
    if (!pet) {
      return null
    }
    const organization = await this.organizationsRepository.findById(
      pet?.organization_id,
    )
    return organization || null
  }
}
