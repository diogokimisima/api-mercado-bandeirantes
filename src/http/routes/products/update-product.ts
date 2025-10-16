import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '@/lib/prisma'

export async function updateProduct(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .put('/products/:id', {
      schema: {
        tags: ['Products'],
        summary: 'Update a product',
        params: z.object({
          id: z.coerce.number(),
        }),
        body: z.object({
          description: z.string().min(3),
          pluCode: z.string().min(1).max(50),
          categoryId: z.number(),
          imageUrl: z.string().url().optional().nullable(),
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
            }),
          }),
          400: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    }, async (request, reply) => {
      const { id } = request.params
      const { description, pluCode, categoryId, imageUrl } = request.body

      // Check if product exists
      const productExists = await prisma.product.findUnique({
        where: {
          id,
        },
      })

      if (!productExists) {
        return reply.status(404).send({ message: 'Product not found' })
      }

      // Check if category exists
      const categoryExists = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      })

      if (!categoryExists) {
        return reply.status(404).send({ message: 'Category not found' })
      }

      try {
        const product = await prisma.product.update({
          where: {
            id,
          },
          data: {
            description,
            pluCode,
            categoryId,
            imageUrl,
          },
        })

        return {
          product,
        }
      } catch (error) {
        if (error.code === 'P2002') {
          return reply.status(400).send({
            message: 'A product with this PLU code already exists',
          })
        }
        throw error
      }
    })
}