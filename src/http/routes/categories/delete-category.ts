import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '@/lib/prisma'

export async function deleteCategory(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/categories/:id', {
      schema: {
        tags: ['Categories'],
        summary: 'Delete a category',
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          204: z.null(),
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

      // Check if category exists
      const categoryExists = await prisma.category.findUnique({
        where: {
          id,
        },
        include: {
          products: true,
        },
      })

      if (!categoryExists) {
        return reply.status(404).send({ message: 'Category not found' })
      }

      // Check if category has products
      if (categoryExists.products.length > 0) {
        return reply.status(400).send({ 
          message: 'Cannot delete a category with associated products' 
        })
      }

      await prisma.category.delete({
        where: {
          id,
        },
      })

      return reply.status(204).send(null)
    })
}