import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Ensure public/images directories exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
        // Use the filename provided in the body or query, explicitly
        // This allows us to overwrite 'main_visual.jpg' regardless of what the user uploaded
        // We expect the frontend to send the target filename in the FormData
        const targetName = req.body.fileName;
        if (targetName) {
            cb(null, targetName);
        } else {
            // Fallback (shouldn't happen with our frontend logic)
            cb(null, file.originalname);
        }
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log(`File uploaded successfully: ${req.file.filename}`);
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

// 네이버 블로그 RSS API
app.get('/api/blog', async (req, res) => {
    try {
        const response = await fetch('https://rss.blog.naver.com/rebelleamie.xml', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const xml = await response.text();

        // item 파싱
        const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => {
            const block = m[1];
            const get = (tag) => {
                const match = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
                return match ? (match[1] || match[2] || '').trim() : '';
            };
            const thumbMatch = block.match(/url="([^"]+)"/);
            const descRaw = get('description');
            // description에서 첫 번째 img src 추출 (썸네일 fallback)
            const imgMatch = descRaw.match(/<img[^>]+src="([^"]+)"/i);

            return {
                title: get('title'),
                link: get('link'),
                pubDate: get('pubDate'),
                thumbnail: thumbMatch ? thumbMatch[1] : (imgMatch ? imgMatch[1] : ''),
                description: descRaw.replace(/<[^>]+>/g, '').trim().slice(0, 80)
            };
        }).slice(0, 9);

        res.json(items);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
