import { Pool } from 'pg';
import { z } from 'zod';

const messageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const input = messageSchema.parse(req.body);
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    try {
      const { rows: [message] } = await pool.query(
        'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
        [input.name, input.email, input.message]
      );
      return res.status(201).json(message);
    } finally {
      await pool.end();
    }
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.errors[0].message,
        field: err.errors[0].path.join('.'),
      });
    }
    console.error('Contact error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
