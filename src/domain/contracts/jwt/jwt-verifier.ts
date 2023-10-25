export type JwtVerifierResult = Record<string, string> | undefined

export abstract class JwtVerifier {
  verify: (token: string) => Promise<JwtVerifierResult>
}
