import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '@/lib/prisma'

export async function getProduct(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/products/:id', {
      schema: {
        tags: ['Products'],
        summary: 'Get a product by ID',
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: z.object({
            product: z.object({
              id: z.number(),
              description: z.string(),
              pluCode: z.string(),
              categoryId: z.number(),
              imageUrl: z.string().nullable(),
              createdAt: z.date(),
              updatedAt: z.date(),
              category: z.object({
                id: z.number(),
                categoryName: z.string(),
              }),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    }, async (request, reply) => {
      const { id } = request.params

      const product = await prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          category: {
            select: {
              id: true,
              categoryName: true,
            },
          },
        },
      })

      if (!product) {
        return reply.status(404).send({ message: 'Product not found' })
      }

      return {
        product,
      }
    })
}