import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3001').transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // PostgreSQL Database (AWS RDS) - Used by Prisma ORM
  DATABASE_URL: z.string().url('Must be a valid PostgreSQL connection string'),

  // Twilio Configuration
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_WHATSAPP_NUMBER: z.string(),

  // Razorpay Configuration
  RAZORPAY_KEY_ID: z.string(),
  RAZORPAY_KEY_SECRET: z.string(),

  // Application Configuration
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),
  JWT_SECRET: z.string().default('dev-secret'),
});

type EnvConfig = z.infer<typeof envSchema>;

let config: EnvConfig;

try {
  config = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Invalid environment variables:', error.errors);
    process.exit(1);
  }
  throw error;
}

export const env = config;
