export abstract class JwtGenerator {
  generate: (payload: Record<string, string>) => Promise<string>
}
