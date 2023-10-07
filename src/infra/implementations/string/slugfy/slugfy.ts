import { type Slugifier } from '@/domain/contracts'

export class Slugify implements Slugifier {
  constructor(private readonly separator: string = '-') {}

  slugify(value: string): string {
    if (!value) return ''

    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, this.separator)
      .replace(new RegExp(`${this.separator}+`, 'g'), this.separator)
  }
}
