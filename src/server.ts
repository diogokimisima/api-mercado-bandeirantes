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

// Importação das rotas de categoria
import { createCategory } from './http/routes/categories/create-category'
import { deleteCategory } from './http/routes/categories/delete-category'
import { getCategory } from './http/routes/categories/get-category'
import { listCategories } from './http/routes/categories/list-categories'
import { updateCategory } from './http/routes/categories/update-category'

// Importação das rotas de produto
import { createProduct } from './http/routes/products/create-product'
import { deleteProduct } from './http/routes/products/delete-product'
import { getProduct } from './http/routes/products/get-product'
import { listProducts } from './http/routes/products/list-products'
import { updateProduct } from './http/routes/products/update-product'

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
    servers: [
      {
        url: '/api',
        description: 'API Server',
      }
    ],
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

// Registrando todas as rotas sob o prefixo /api
app.register(
  async (apiRouter) => {
    // Registro das rotas de categoria
    apiRouter.register(createCategory)
    apiRouter.register(deleteCategory)
    apiRouter.register(getCategory)
    apiRouter.register(listCategories)
    apiRouter.register(updateCategory)

    // Registro das rotas de produto
    apiRouter.register(createProduct)
    apiRouter.register(deleteProduct)
    apiRouter.register(getProduct)
    apiRouter.register(listProducts)
    apiRouter.register(updateProduct)
  }, 
  { prefix: '/api' }
)

app.listen({ port: env.SERVER_PORT, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP Server running at http://localhost:${env.SERVER_PORT}`)
  console.log(`API routes available at http://localhost:${env.SERVER_PORT}/api`)
  console.log(`Documentation available at http://localhost:${env.SERVER_PORT}/docs`)
})