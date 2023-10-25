import {
  type INestApplication,
  UnprocessableEntityException,
  ValidationPipe
} from '@nestjs/common'

export const useValidationPipe = (app: INestApplication): void => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const message = errors.reduce((prev, { property, constraints }) => {
          if (!constraints) return { ...prev }
          return { ...prev, [property]: Object.values(constraints) }
        }, {})

        return new UnprocessableEntityException({ errors: message })
      }
    })
  )
}
