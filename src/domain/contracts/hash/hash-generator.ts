export abstract class HashGenerator {
  generate: (value: string) => Promise<string>
}
