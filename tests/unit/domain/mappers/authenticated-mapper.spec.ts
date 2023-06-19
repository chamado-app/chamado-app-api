import { mockAuthenticatedDto, mockTokenEntity } from '@tests/__mocks__'

import { AuthenticatedMapper } from '@/domain/mappers'

const makeSut = (): { sut: AuthenticatedMapper } => {
  const sut = new AuthenticatedMapper()
  return { sut }
}

describe('Mappers/AuthenticateMapper', () => {
  it('should mapFrom AuthenticatedDto to TokenEntity', () => {
    const dto = mockAuthenticatedDto()
    const { sut } = makeSut()

    const result = sut.mapFrom(dto)

    expect(result).toEqual({ token: dto.accessToken, type: dto.type })
  })

  it('should mapTo TokenEntity to AuthenticatedDto', () => {
    const token = mockTokenEntity()
    const { sut } = makeSut()

    const result = sut.mapTo(token)

    expect(result).toEqual({ accessToken: token.token, type: token.type })
  })
})
