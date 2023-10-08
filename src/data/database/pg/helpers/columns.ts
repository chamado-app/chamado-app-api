import { type TableColumnOptions } from 'typeorm'

export const primaryGeneratedColumnUuid = (): TableColumnOptions => ({
  name: 'id',
  type: 'uuid',
  generationStrategy: 'uuid',
  isUnique: true,
  isPrimary: true,
  default: 'uuid_generate_v4()',
  isNullable: false
})

export const createdAtField = (): TableColumnOptions => ({
  name: 'created_at',
  type: 'timestamp',
  default: 'CURRENT_TIMESTAMP(6)'
})

export const updatedAtField = (): TableColumnOptions => ({
  name: 'updated_at',
  type: 'timestamp',
  default: 'CURRENT_TIMESTAMP(6)',
  onUpdate: 'CURRENT_TIMESTAMP(6)'
})

export const deletedAtField = (): TableColumnOptions => ({
  name: 'deleted_at',
  type: 'timestamp',
  isNullable: true
})

export const timestampFields = (softDeletes = true): TableColumnOptions[] => [
  createdAtField(),
  updatedAtField(),
  ...(softDeletes ? [deletedAtField()] : [])
]

export const makeEntityColumns = (
  columns: TableColumnOptions[],
  softDeletes = true
): TableColumnOptions[] => [
  primaryGeneratedColumnUuid(),
  ...columns,
  ...timestampFields(softDeletes)
]
