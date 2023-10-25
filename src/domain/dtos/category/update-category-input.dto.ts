export class UpdateCategoryInputDto {
  constructor(
    readonly name?: string,
    readonly description?: string,
    readonly isActive?: boolean
  ) {}
}
