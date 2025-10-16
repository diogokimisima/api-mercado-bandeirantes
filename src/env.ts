import { config } from 'dotenv'

config()

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVER_PORT: Number(process.env.SERVER_PORT || 3333),
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret_key'
}