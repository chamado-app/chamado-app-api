export class ListCategoriesInputDto {
  constructor(
    readonly take: number = 20,
    readonly skip: number = 20,
    readonly search?: string
  ) {}
}
