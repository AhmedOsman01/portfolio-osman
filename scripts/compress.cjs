/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public', 'projects');

async function processImages() {
    const files = fs.readdirSync(publicDir);
    let processed = 0;

    for (const file of files) {
        if (file.endsWith('.png')) {
            const inputPath = path.join(publicDir, file);

            const buffer = await sharp(inputPath)
                .resize({ width: 1200, withoutEnlargement: true })
                .jpeg({ quality: 80 })
                .toBuffer();

            fs.writeFileSync(inputPath, buffer);
            console.log(`Processed: ${file}`);
            processed++;
        }
    }

    console.log(`Finished processing ${processed} images.`);
}

processImages().catch(console.error);
