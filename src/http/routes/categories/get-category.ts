import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '@/lib/prisma'

export async function getCategory(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/categories/:id', {
      schema: {
        tags: ['Categories'],
        summary: 'Get a category by ID',
        params: z.object({
          id: z.coerce.number(),
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
        },
      },
    }, async (request, reply) => {
      const { id } = request.params

      const category = await prisma.category.findUnique({
        where: {
          id,
        },
      })

      if (!category) {
        return reply.status(404).send({ message: 'Category not found' })
      }

      return {
        category,
      }
    })
}