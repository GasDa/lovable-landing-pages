import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "og");

const width = 1200;
const height = 630;

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const svgTemplate = ({ title, subtitle, accent }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0f1c" />
      <stop offset="100%" stop-color="#0f1f2f" />
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#60a5fa" />
    </linearGradient>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="60" />
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <circle cx="940" cy="110" r="180" fill="url(#accent)" opacity="0.18" filter="url(#blur)" />
  <circle cx="180" cy="520" r="220" fill="url(#accent)" opacity="0.12" filter="url(#blur)" />

  <rect x="80" y="90" width="1040" height="450" rx="28" fill="#0b1424" opacity="0.65" stroke="rgba(34,211,238,0.25)" />
  <rect x="120" y="140" width="360" height="40" rx="20" fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.2)" />
  <circle cx="150" cy="160" r="6" fill="${accent}" />
  <text x="170" y="168" fill="#cbd5f5" font-family="Arial, Helvetica, sans-serif" font-size="18" letter-spacing="0.2">AI Copilot</text>

  <text x="120" y="250" fill="#f8fafc" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="700">${escapeXml(title)}</text>
  <text x="120" y="308" fill="#94a3b8" font-family="Arial, Helvetica, sans-serif" font-size="22">${escapeXml(subtitle)}</text>

  <rect x="120" y="360" width="280" height="54" rx="14" fill="url(#accent)" />
  <text x="150" y="395" fill="#0b1424" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700">${escapeXml(title)}</text>

  <rect x="480" y="360" width="620" height="160" rx="18" fill="rgba(148,163,184,0.08)" stroke="rgba(148,163,184,0.2)" />
  <rect x="510" y="388" width="220" height="16" rx="8" fill="rgba(148,163,184,0.35)" />
  <rect x="510" y="420" width="420" height="14" rx="7" fill="rgba(148,163,184,0.25)" />
  <rect x="510" y="448" width="380" height="14" rx="7" fill="rgba(148,163,184,0.22)" />
  <rect x="510" y="476" width="320" height="14" rx="7" fill="rgba(148,163,184,0.2)" />
</svg>`;

const render = async (fileName, text) => {
  const svg = svgTemplate(text);
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT_DIR, fileName));
};

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

const main = async () => {
  ensureDir(OUT_DIR);

  const ru = readJson(path.join(ROOT, "src", "locales", "ru.json"));
  const en = readJson(path.join(ROOT, "src", "locales", "en.json"));

  await render("ru.png", {
    title: `${ru.hero?.title ?? ""} ${ru.hero?.titleHighlight ?? ""}`.trim(),
    subtitle: ru.hero?.subtitle ?? "",
    accent: "#22d3ee",
  });

  await render("en.png", {
    title: `${en.hero?.title ?? ""} ${en.hero?.titleHighlight ?? ""}`.trim(),
    subtitle: en.hero?.subtitle ?? "",
    accent: "#60a5fa",
  });
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
