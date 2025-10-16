import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '@/lib/prisma'

export async function createCategory(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/categories', {
      schema: {
        tags: ['Categories'],
        summary: 'Create a new category',
        body: z.object({
          categoryName: z.string().min(3).max(100),
        }),
        response: {
          201: z.object({
            category: z.object({
              id: z.number(),
              categoryName: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    }, async (request, reply) => {
      const { categoryName } = request.body

      try {
        const category = await prisma.category.create({
          data: {
            categoryName,
          },
        })

        return reply.status(201).send({
          category,
        })
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