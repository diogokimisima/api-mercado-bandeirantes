import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { env } from './env'
import { errorHandler } from './http/error-handler'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(swagger, {
  openapi: {
    info: {
      title: 'Fastify Prisma API',
      description: 'API com Fastify, Prisma e Swagger',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(swaggerUi, {
  routePrefix: '/docs',
})

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
})

// Registro de rotas
// app.register(createUser)

app.listen({ port: env.SERVER_PORT, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP Server running at http://localhost:${env.SERVER_PORT}`)
  console.log(`Documentation available at http://localhost:${env.SERVER_PORT}/docs`)
})