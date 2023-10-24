import fastify from 'fastify'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

const app = fastify()

// app.register(fastifyCookie)
// app.register(fastifyJwt, {
//   secret: env.JWT_SECRET,
//   cookie: {
//     cookieName: 'refreshToken',
//     signed: false,
//   },
//   sign: {
//     expiresIn: '10m',
//   },
// })
app.register(organizationsRoutes)

export default app
