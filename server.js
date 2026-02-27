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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
