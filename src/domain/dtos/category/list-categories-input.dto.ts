export class ListCategoriesInputDto {
  constructor(
    readonly take: number,
    readonly skip: number,
    readonly search?: string
  ) {}
}
