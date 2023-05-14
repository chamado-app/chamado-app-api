export const app = {
  port: parseInt(process.env.port, 10) || 3000,
  isProduction: process.env.NODE_ENV !== 'production',
  jwtSecret: process.env.JWT_SECRET
}
