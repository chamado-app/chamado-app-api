export abstract class HashComparer {
  compare: (value: string, hashedValue: string) => Promise<boolean>
}
