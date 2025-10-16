import { FastifyReply, FastifyRequest } from 'fastify'

export async function auth(app: any) {
  app.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  })

  app.decorateRequest('getCurrentUserId', async function (this: any) {
    const { sub } = this.user as { sub: string }
    return sub
  })
}

declare module 'fastify' {
  interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    user: any
  }
}