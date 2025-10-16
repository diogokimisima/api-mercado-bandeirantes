import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '@/lib/prisma'

export async function listCategories(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/categories', {
      schema: {
        tags: ['Categories'],
        summary: 'List all categories',
        response: {
          200: z.object({
            categories: z.array(
              z.object({
                id: z.number(),
                categoryName: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
              })
            ),
          }),
        },
      },
    }, async (request, reply) => {
      const categories = await prisma.category.findMany({
        orderBy: {
          categoryName: 'asc',
        },
      })

      return {
        categories,
      }
    })
}