import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public', 'projects');

async function processImages() {
  const files = fs.readdirSync(publicDir);
  let processed = 0;

  for (const file of files) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(publicDir, file);
      // Create a temporary file buffer
      const buffer = await sharp(inputPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();
      
      // Overwrite the original .png file but keep the .png extension
      // (Next.js image optimization doesn't care about the extension, it reads the buffers magic bytes)
      fs.writeFileSync(inputPath, buffer);
      console.log(`Processed: ${file} (now a compressed JPEG)`);
      processed++;
    }
  }

  console.log(`Finished processing ${processed} images.`);
}

processImages().catch(console.error);
