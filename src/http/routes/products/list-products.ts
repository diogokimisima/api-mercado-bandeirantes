import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '@/lib/prisma'

export async function listProducts(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/products', {
      schema: {
        tags: ['Products'],
        summary: 'List all products',
        querystring: z.object({
          categoryId: z.coerce.number().optional(),
          page: z.coerce.number().default(1),
          perPage: z.coerce.number().default(10),
        }),
        response: {
          200: z.object({
            products: z.array(
              z.object({
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
              })
            ),
            meta: z.object({
              page: z.number(),
              perPage: z.number(),
              totalCount: z.number(),
            }),
          }),
        },
      },
    }, async (request) => {
      const { categoryId, page, perPage } = request.query

      const where = categoryId ? { categoryId } : {}

      const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            category: {
              select: {
                id: true,
                categoryName: true,
              },
            },
          },
          take: perPage,
          skip: (page - 1) * perPage,
          orderBy: {
            description: 'asc',
          },
        }),
        prisma.product.count({ where }),
      ])

      return {
        products,
        meta: {
          page,
          perPage,
          totalCount,
        },
      }
    })
}