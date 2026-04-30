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

  const rawText = textResult.value.trim();

  const payload = {
    title: tour.title,
    category: category.name,
    duration: tour.duration,
    sourceFile: tour.file,
    html: htmlResult.value.trim(),
    text: rawText,
    steps: parseItinerarySteps(rawText, tour, category),
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

const placeImageMap = [
  { aliases: ['addis ababa', 'addis abeba', 'bole'], query: 'Addis Ababa Ethiopia city skyline' },
  { aliases: ['entoto'], query: 'Entoto Hills Addis Ababa Ethiopia' },
  { aliases: ['trinity cathedral', 'holy trinity'], query: 'Holy Trinity Cathedral Addis Ababa Ethiopia' },
  { aliases: ['national museum', 'ethnographic museum', 'merkato', 'mercato', 'sheromeda'], query: 'Addis Ababa Ethiopia market museum' },
  { aliases: ['adadi maryam'], query: 'Adadi Maryam rock hewn church Ethiopia' },
  { aliases: ['tiya', 'tiya stele', 'tiya stelae'], query: 'Tiya stelae Ethiopia' },
  { aliases: ['debre libanos', 'debrelibanos', 'portuges bridge', 'portuguese bridge'], query: 'Debre Libanos Monastery Ethiopia' },
  { aliases: ['blue nile gorge', 'bilu nile gorge'], query: 'Blue Nile Gorge Ethiopia' },
  { aliases: ['wenchi', 'wenchi crater lake'], query: 'Wenchi Crater Lake Ethiopia' },
  { aliases: ['menagesha', 'suba forest'], query: 'Menagesha Suba Forest Ethiopia' },
  { aliases: ['debre zeit', 'bishoftu'], query: 'Bishoftu Debre Zeit Ethiopia lake' },
  { aliases: ['awash'], query: 'Awash National Park Ethiopia' },
  { aliases: ['bahir dar', 'bahirdar'], query: 'Bahir Dar Lake Tana Ethiopia' },
  { aliases: ['lake tana', 'zeghe', 'ura kidane', 'uhre kidane', 'azua-mariam', 'kibran gabriel'], query: 'Lake Tana monasteries Ethiopia' },
  { aliases: ['blue nile falls', 'tisisat', 'tis isat'], query: 'Blue Nile Falls Ethiopia' },
  { aliases: ['gondar', 'gonder', 'fasilidas', 'fasilledes', 'debre birhan selassie', 'royal enclosure'], query: 'Gondar castles Ethiopia' },
  { aliases: ['simien', 'semen', 'debark', 'ras dashen', 'gelada', 'walya ibex'], query: 'Simien Mountains Ethiopia' },
  { aliases: ['axum', 'aksum', 'tsion', 'stelae of axum'], query: 'Axum stelae Ethiopia' },
  { aliases: ['lalibela', 'yemrehane kristos', 'asheton maryam'], query: 'Lalibela rock hewn churches Ethiopia' },
  { aliases: ['harar', 'harer', 'jugol'], query: 'Harar Jugol Ethiopia' },
  { aliases: ['bale'], query: 'Bale Mountains Ethiopia' },
  { aliases: ['danakil', 'dallol'], query: 'Danakil Depression Ethiopia' },
  { aliases: ['erta ale'], query: 'Erta Ale volcano Ethiopia' },
  { aliases: ['mekele', 'meqele'], query: 'Mekele Ethiopia' },
  { aliases: ['tigray'], query: 'Tigray rock churches Ethiopia' },
  { aliases: ['arbaminch', 'arba minch', 'arbamich'], query: 'Arba Minch Ethiopia' },
  { aliases: ['lake chamo'], query: 'Lake Chamo Ethiopia' },
  { aliases: ['chencha', 'dorze'], query: 'Dorze village Chencha Ethiopia' },
  { aliases: ['jinka'], query: 'Jinka Omo Valley Ethiopia' },
  { aliases: ['woyto'], query: 'Weyto Omo Valley Ethiopia' },
  { aliases: ['mursi', 'mago'], query: 'Mursi tribe Mago National Park Ethiopia' },
  { aliases: ['turmi'], query: 'Turmi Omo Valley Ethiopia' },
  { aliases: ['keyafer', 'keyafar', 'kayafer'], query: 'Keyafer market Omo Valley Ethiopia' },
  { aliases: ['dimeka'], query: 'Dimeka market Omo Valley Ethiopia' },
  { aliases: ['hamer', 'hamar', 'hammer people'], query: 'Hamar tribe Omo Valley Ethiopia' },
  { aliases: ['bena', 'benna'], query: 'Bena tribe Omo Valley Ethiopia' },
  { aliases: ['ari'], query: 'Ari village Omo Valley Ethiopia' },
  { aliases: ['karo', 'kara', 'karicho'], query: 'Karo tribe Omo Valley Ethiopia' },
  { aliases: ['nyangatom'], query: 'Nyangatom tribe Omo Valley Ethiopia' },
  { aliases: ['dassanech', 'dasenech'], query: 'Dassanech tribe Omo Valley Ethiopia' },
  { aliases: ['konso', 'konso landscape', 'koso tribe'], query: 'Konso landscape Ethiopia' },
  { aliases: ['ziway', 'lake ziway'], query: 'Lake Ziway Ethiopia' },
];

function parseItinerarySteps(rawText, tour, category) {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const steps = [];
  let current = null;

  for (const line of lines) {
    if (/^day\s*0*\d+/i.test(line)) {
      if (current) {
        steps.push(current);
      }

      current = {
        title: line,
        descriptionLines: [],
      };
      continue;
    }

    if (current) {
      current.descriptionLines.push(line);
    }
  }

  if (current) {
    steps.push(current);
  }

  if (!steps.length) {
    return [];
  }

  return steps.map((step, index) => {
    const title = normalizeDayTitle(step.title);
    const description =
      step.descriptionLines.join(' ') ||
      'Detailed description available in the downloadable document.';

    return {
      day: index + 1,
      title,
      description,
      imageUrl: getStepImageUrl({ title, description }, tour, category),
    };
  });
}

function normalizeDayTitle(text) {
  const trimmed = text.replace(/\s+/g, ' ').trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function getStepImageUrl(step, tour, category) {
  const searchableText = `${step.title} ${step.description}`.toLowerCase();

  for (const place of placeImageMap) {
    if (place.aliases.some((alias) => searchableText.includes(alias))) {
      return buildStepImageUrl(place.query);
    }
  }

  const cleanedTitle = step.title
    .replace(/^day\s*0*\d+\s*:?/i, '')
    .replace(/[()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleanedTitle) {
    const titleQuery = cleanedTitle
      .split(/[-–,/]/)
      .map((part) => part.trim())
      .filter(Boolean)
      .slice(0, 3)
      .join(' ');

    if (titleQuery) {
      return buildStepImageUrl(`${titleQuery} Ethiopia`);
    }
  }

  return buildStepImageUrl(`${tour.title} ${category.name}`);
}

function buildStepImageUrl(query) {
  return `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`;
}
