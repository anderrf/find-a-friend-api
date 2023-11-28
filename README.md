
# Find a Friend API

API for finding you a new pet mate

## Functional Requirements (FR)

- [X] It should be able to register a pet
- [X] The data required to register a pet are:
    - Name
    - Description
    - Species
    - Required space
    - Energy level
    - Independence level
    - Size
    - Photos
    - Requirements to adopt
- [X] It should be able to list every pet in a city that's available for adoption
- [X] It should be able to filter pets by its characteristics
- [X] It should be able to see a pet's details for adoption
- [X] It should be able to register as an ORG
- [X] The data required to register an ORG are:
    - Name of responsible
    - E-mail
    - Postal code
    - Address
    - City
    - State
    - Password
- [X] It should be able to authenticate as an ORG

## Business Rules (BR)

- [X] In order to list the pets, it will be required to inform a city in the form
- [x] An ORG will need to inform its address and Whatsapp phone number to be registered
- [X] A pet should be linked to an ORG
- [X] An user who wants to adopt a pet will contact the ORG by Whatsapp
- [X] All pet's listing filters but the city will be optional
- [X] An ORG should be authenticated to access the aplication as admin
