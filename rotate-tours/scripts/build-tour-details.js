import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mammoth from 'mammoth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const sourceDir = path.resolve(projectRoot, 'public', 'Tour Package');
const outputDir = path.resolve(projectRoot, 'public', 'tour-details');
const tourPackagesPath = path.resolve(projectRoot, 'src', 'data', 'tourPackages.json');

async function readTourPackages() {
  const raw = await fs.readFile(tourPackagesPath, 'utf-8');
  return JSON.parse(raw);
}

async function ensureOutputDir() {
  await fs.mkdir(outputDir, { recursive: true });
}

async function convertTourDoc({ category, tour }) {
  if (!category.folder) {
    console.warn(`Skipping ${tour.title} — category ${category.name} missing folder property.`);
    return;
  }

  const docPath = path.resolve(sourceDir, category.folder, tour.file);
  const outputPath = path.resolve(outputDir, `${tour.slug}.json`);

  try {
    await fs.access(docPath);
  } catch {
    console.warn(`Source file not found: ${docPath}`);
    return;
  }

  const [htmlResult, textResult] = await Promise.all([
    mammoth.convertToHtml({ path: docPath }),
    mammoth.extractRawText({ path: docPath }),
  ]);

  const payload = {
    title: tour.title,
    category: category.name,
    duration: tour.duration,
    sourceFile: tour.file,
    html: htmlResult.value.trim(),
    text: textResult.value.trim(),
    generatedAt: new Date().toISOString(),
  };

  await fs.writeFile(outputPath, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`→ Generated ${path.relative(projectRoot, outputPath)}`);
}

async function main() {
  await ensureOutputDir();
  const tourPackages = await readTourPackages();

  for (const category of tourPackages.categories) {
    for (const tour of category.tours) {
      // eslint-disable-next-line no-await-in-loop
      await convertTourDoc({ category, tour });
    }
  }

  console.log('Tour detail payloads generated successfully.');
}

main().catch((error) => {
  console.error('Failed to build tour detail payloads:', error);
  process.exit(1);
});

