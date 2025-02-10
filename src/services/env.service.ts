import { EnvSchema } from '@/types/EnvSchema'
import 'dotenv/config'

EnvSchema.parse(process.env)
