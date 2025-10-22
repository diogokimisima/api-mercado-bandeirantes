import { FastifyRequest, FastifyReply } from 'fastify'

export async function apiKeyAuth(request: FastifyRequest, reply: FastifyReply) {
  const apiKey = request.headers['x-api-key']
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return reply.status(401).send({
      message: 'Unauthorized. Invalid or missing API Key.',
    })
  }
}