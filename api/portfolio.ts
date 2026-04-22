import { Pool } from 'pg';
import { z } from 'zod';

const photoFiles = [
  "_1000254.jpg", "10.jpg", "1.jpg", "29.jpg", "38.jpg", "47.jpg", "56.jpg", "65.jpg",
  "_1000269.jpg", "11.jpg", "20.jpg", "2.jpg", "39.jpg", "48.jpg", "57.jpg", "6.jpg",
  "_1000297.jpg", "12.jpg", "21.jpg", "30.jpg", "3.jpg", "49.jpg", "58.jpg", "7.jpg",
  "_1000306.jpg", "13.jpg", "22.jpg", "31.jpg", "40.jpg", "4.jpg", "59.JPG", "8.jpg",
  "_1020467.jpg", "14.jpg", "23.jpg", "32.jpg", "41.jpg", "50.jpg", "5.jpg", "9.jpg",
  "_1020473.jpg", "15.jpg", "24.jpg", "33.jpg", "42.jpg", "51.jpg", "60.jpg",
  "_1020486.jpg", "16.jpg", "25.jpg", "34.jpg", "43.jpg", "52.jpg", "61.jpg",
  "_1020509.jpg", "17.jpg", "26.jpg", "35.jpg", "44.jpg", "53.jpg", "62.jpg",
  "_1020510.jpg", "18.jpg", "27.jpg", "36.jpg", "45.jpg", "54.jpg", "63.jpg",
  "_1020517.jpg", "19.jpg", "28.jpg", "37.jpg", "46.jpg", "55.jpg", "64.jpg"
];

const videoFiles = [
  { title: "Beeh Final", url: "/videos/beeh final.mp4" },
  { title: "Outfit 3 Redo", url: "/videos/Outfit_3_Redo.mp4" },
  { title: "Scribble", url: "/videos/Scribble.MP4" },
  { title: "Culverin", url: "/videos/culverin.MP4" },
  { title: "Outfit 4", url: "/videos/Outfit_4.mp4" },
  { title: "Shanty Main", url: "/videos/shanty main.mp4" },
  { title: "FTS", url: "/videos/FTS.MP4" },
  { title: "Pastry Reels", url: "/videos/pastry reels - HD 1080p.mp4" },
  { title: "Titan", url: "/videos/titan.MP4" },
  { title: "Gold 2", url: "/videos/gold2.mp4" },
  { title: "Reel 5", url: "/videos/reel_5.mp4" },
  { title: "Walima Second", url: "/videos/Walima_Second.mp4" },
  { title: "Gold Final", url: "/videos/gold final.mp4" },
  { title: "Reel", url: "/videos/Reel.MP4" },
  { title: "Guards Vid", url: "/videos/guards vid.mp4" },
  { title: "Rubix", url: "/videos/Rubix.MP4" }
];

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const { rows: [{ count }] } = await pool.query('SELECT COUNT(*) as count FROM portfolio_items');

    if (parseInt(count) === 0) {
      for (const photo of photoFiles) {
        const url = `/photos/${photo}`;
        await pool.query(
          'INSERT INTO portfolio_items (title, type, url, thumbnail_url, category) VALUES ($1, $2, $3, $4, $5)',
          [photo.split('.')[0].replace(/_/g, ' '), 'photo', url, url, 'Photography']
        );
      }
      for (const video of videoFiles) {
        await pool.query(
          'INSERT INTO portfolio_items (title, type, url, thumbnail_url, category) VALUES ($1, $2, $3, $4, $5)',
          [video.title, 'video', video.url, '/photos/1.jpg', 'Videography']
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
