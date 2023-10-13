export abstract class JwtVerifier {
  verify: (token: string) => Promise<any>
}
