import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '@/lib/prisma'

export async function updateCategory(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .put('/categories/:id', {
      schema: {
        tags: ['Categories'],
        summary: 'Update a category',
        params: z.object({
          id: z.coerce.number(),
        }),
        body: z.object({
          categoryName: z.string().min(3).max(100),
        }),
        response: {
          200: z.object({
            category: z.object({
              id: z.number(),
              categoryName: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    }, async (request, reply) => {
      const { id } = request.params
      const { categoryName } = request.body

      try {
        const categoryExists = await prisma.category.findUnique({
          where: {
            id,
          },
        })

        if (!categoryExists) {
          return reply.status(404).send({ message: 'Category not found' })
        }

        const category = await prisma.category.update({
          where: {
            id,
          },
          data: {
            categoryName,
          },
        })

        return {
          category,
        }
      } catch (error) {
        if (error.code === 'P2002') {
          return reply.status(400).send({
            message: 'A category with this name already exists',
          })
        }
        throw error
      }
    })
}