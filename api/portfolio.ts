import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const { rows: [{ count }] } = await pool.query('SELECT COUNT(*) as count FROM portfolio_items');

    if (parseInt(count) === 0) {
      const photoExtensions = /\.(jpg|jpeg|JPG|JPEG|png|PNG|webp|WEBP)$/;
      const videoExtensions = /\.(mp4|MP4|mov|MOV|avi|AVI|webm|WEBM)$/;

      const photosDir = path.join(process.cwd(), 'client/public/photos');
      const videosDir = path.join(process.cwd(), 'client/public/videos');

      const photoFiles = fs.existsSync(photosDir)
        ? fs.readdirSync(photosDir).filter((f) => photoExtensions.test(f))
        : [];

      const videoFiles = fs.existsSync(videosDir)
        ? fs.readdirSync(videosDir).filter((f) => videoExtensions.test(f))
        : [];

      const firstPhoto = photoFiles[0] ? `/photos/${photoFiles[0]}` : null;

      for (const filename of photoFiles) {
        const url = `/photos/${filename}`;
        await pool.query(
          'INSERT INTO portfolio_items (title, type, url, thumbnail_url, category) VALUES ($1, $2, $3, $4, $5)',
          [titleFromFilename(filename), 'photo', url, url, 'Photography']
        );
      }

      for (const filename of videoFiles) {
        const url = `/videos/${filename}`;
        await pool.query(
          'INSERT INTO portfolio_items (title, type, url, thumbnail_url, category) VALUES ($1, $2, $3, $4, $5)',
          [titleFromFilename(filename), 'video', url, firstPhoto ?? '/photos/1.jpg', 'Videography']
        );
      }
    }

    const { rows } = await pool.query('SELECT * FROM portfolio_items ORDER BY id');
    return res.status(200).json(rows);
  } catch (err: any) {
    console.error('Portfolio error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await pool.end();
  }
}
