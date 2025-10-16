import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '@/lib/prisma'

export async function deleteProduct(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/products/:id', {
      schema: {
        tags: ['Products'],
        summary: 'Delete a product',
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

      // Check if product exists
      const productExists = await prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          orderItems: true,
        },
      })

      if (!productExists) {
        return reply.status(404).send({ message: 'Product not found' })
      }

      // Check if product has order items
      if (productExists.orderItems.length > 0) {
        return reply.status(400).send({ 
          message: 'Cannot delete a product with associated orders' 
        })
      }

      await prisma.product.delete({
        where: {
          id,
        },
      })

      return reply.status(204).send(null)
    })
}