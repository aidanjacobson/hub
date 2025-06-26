import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import API routes
import ApiRouter from './routes/api.js';

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ---- API routes ---- */
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
// add more /api/* routes here

/* ---- Static React in production ---- */
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const buildDir  = path.join(__dirname, '..', 'client', 'dist');

  app.use(express.static(buildDir));
  app.get('*', (_req, res) =>
    res.sendFile(path.join(buildDir, 'index.html'))
  );
}

app.listen(PORT, () => console.log(`API listening on ${PORT}`));

app.use('/api', ApiRouter);