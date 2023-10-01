import { describe, it, beforeEach, expect } from 'vitest'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchAllPetsInTheCityUseCase } from './search-all-pets-in-the-city'

describe('Search All Pets In The City Use Case', () => {
  let organizationsRepository: OrganizationsRepository
  let petsRepository: PetsRepository
  let sut: SearchAllPetsInTheCityUseCase

  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    await organizationsRepository.create({
      id: 'org-01',
      name: 'Pet Help',
      city: 'Mongaguá',
      state: 'São Paulo',
      address: 'Av São Paulo, 876',
      responsible_name: 'Carlos Robson',
      email: 'contato@pethelp.org',
      mobile_phone_number: '13111112222',
      postal_code: '11730000',
      password_hash: 'pethelper50',
    })
    await organizationsRepository.create({
      id: 'org-02',
      name: 'Animal Pal',
      city: 'Mongaguá',
      state: 'São Paulo',
      address: 'Av Marina, 999',
      responsible_name: 'Marcos Janeiro',
      email: 'contato@animalpal.org',
      mobile_phone_number: '13111112222',
      postal_code: '11730000',
      password_hash: 'palpassword',
    })
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    await petsRepository.create({
      name: 'Nina',
      species: 'Dog',
      size: 2,
      required_space: 2,
      age: 3,
      energy_level: 2,
      description: 'Black and white dog',
      independence_level: 1,
      organization_id: 'org-01',
    })
    await petsRepository.create({
      name: 'Toby',
      species: 'Dog',
      size: 1,
      required_space: 2,
      age: 3,
      energy_level: 1,
      description: 'Black and white dog',
      independence_level: 1,
      organization_id: 'org-02',
    })
    await petsRepository.create({
      name: 'Nina',
      species: 'Cat',
      size: 1,
      required_space: 1,
      age: 1,
      energy_level: 3,
      description: 'Orange cat',
      independence_level: 2,
      organization_id: 'org-01',
    })
    sut = new SearchAllPetsInTheCityUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    const { pets, count } = await sut.execute({
      state: 'São Paulo',
      city: 'Mongaguá',
    })
    expect(count).toEqual(3)
    expect(pets).toEqual([
      expect.objectContaining({ id: expect.any(String) }),
      expect.objectContaining({ id: expect.any(String) }),
      expect.objectContaining({ id: expect.any(String) }),
    ])
  })
})
