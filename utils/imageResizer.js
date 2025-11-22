import fs from "fs";
import path from "path";
import sharp from "sharp";

// 🔧 Hardcoded relative directory path
const IMAGE_DIR = "/home/withtahmid/cdn/photography"; // change this to your folder

const allowedExt = [".jpg", ".jpeg", ".png", ".webp"];

export async function generateThumbnails() {
    const dirPath = path.resolve(IMAGE_DIR);
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        const base = path.basename(file, ext);

        if (!allowedExt.includes(ext)) continue;

        const inputFile = path.join(dirPath, file);
        const outputName = `thumbnail-${base}${ext}`;
        const outputFile = path.join(dirPath, outputName);

        try {
            await sharp(inputFile).resize({ height: 50 }).toFile(outputFile);

            console.log("Generated:", outputFile);
        } catch (err) {
            console.error("Failed:", inputFile, err);
        }
    }
}
