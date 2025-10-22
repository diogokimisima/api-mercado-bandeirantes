import { config } from 'dotenv'

config()

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVER_PORT: Number(process.env.SERVER_PORT || 3333),
  API_KEY: process.env.API_KEY || 'default_api_key',
}