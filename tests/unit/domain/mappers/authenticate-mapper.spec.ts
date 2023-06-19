import { mockAuthenticateDto, mockUserEntity } from '@tests/__mocks__'

import { AuthenticateMapper } from '@/domain/mappers'

const makeSut = (): { sut: AuthenticateMapper } => {
  const sut = new AuthenticateMapper()
  return { sut }
}

describe('Mappers/AuthenticateMapper', () => {
  it('should mapFrom AuthenticateDto to UserEntity', () => {
    const dto = mockAuthenticateDto()
    const { sut } = makeSut()

    const result = sut.mapFrom(dto)

    expect(result).toEqual({ email: dto.email, password: dto.password })
  })

  it('should mapTo UserEntity to AuthenticateDto', () => {
    const user = mockUserEntity()
    const { sut } = makeSut()

    const result = sut.mapTo(user)

    expect(result).toEqual({ email: user.email, password: user.password })
  })
})
