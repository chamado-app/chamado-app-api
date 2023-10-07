import { Module } from '@nestjs/common'

import { makeCategoryModuleMetadata } from '@/presentation/factories'

@Module(makeCategoryModuleMetadata())
export class CategoryModule {}
