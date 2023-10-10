import { Module } from '@nestjs/common'

import { makeCategoryModuleMetadata } from '@/main/factories'

@Module(makeCategoryModuleMetadata())
export class CategoryModule {}
