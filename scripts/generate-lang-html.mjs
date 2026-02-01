import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const INDEX_PATH = path.join(DIST, "index.html");

const SITE_URL = (process.env.SITE_URL || "").replace(/\/$/, "");

const buildUrl = (pathName) => (SITE_URL ? `${SITE_URL}${pathName}` : pathName);

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

const replaceMeta = (html, lang, locale) => {
  const isRu = lang === "ru";

  const heroTitle = `${locale.hero?.title ?? ""} ${locale.hero?.titleHighlight ?? ""}`.trim();
  const heroSubtitle = locale.hero?.subtitle ?? "";
  const title = heroTitle || (isRu
    ? "AI Copilot — AI ассистент для интервью и встреч"
    : "AI Copilot — AI assistant for interviews and meetings");
  const description = heroSubtitle || (isRu
    ? "AI ассистент в реальном времени для интервью и встреч: подсказки, коучинг и многоязычная поддержка."
    : "Real-time AI assistance for interviews and meetings: instant suggestions, live coaching, and multilingual support.");

  const ogImage = buildUrl(isRu ? "/og/ru.png" : "/og/en.png");
  const ogUrl = buildUrl(isRu ? "/ru/" : "/en/");
  const ogLocale = isRu ? "ru_RU" : "en_US";

  let next = html;

  next = next.replace(/<html lang="[^"]*">/i, `<html lang="${lang}">`);
  next = next.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  next = next.replace(/<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${description}" />`);

  next = next.replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${title}" />`);
  next = next.replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${description}" />`);
  next = next.replace(/<meta property="og:image" content="[^"]*"\s*\/>/i, `<meta property="og:image" content="${ogImage}" />`);
  next = next.replace(/<meta property="og:locale" content="[^"]*"\s*\/>/i, `<meta property="og:locale" content="${ogLocale}" />`);

  if (next.includes("property=\"og:url\"")) {
    next = next.replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${ogUrl}" />`);
  } else {
    next = next.replace(/<meta property="og:type"[^>]*\/>/i, (match) => `${match}\n    <meta property="og:url" content="${ogUrl}" />`);
  }

  next = next.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${title}" />`);
  next = next.replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/i, `<meta name="twitter:description" content="${description}" />`);
  next = next.replace(/<meta name="twitter:image" content="[^"]*"\s*\/>/i, `<meta name="twitter:image" content="${ogImage}" />`);

  if (next.includes("rel=\"canonical\"")) {
    next = next.replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${ogUrl}" />`);
  } else {
    next = next.replace(/<meta name="theme-color"[^>]*\/>/i, (match) => `${match}\n    <link rel="canonical" href="${ogUrl}" />`);
  }

  return next;
};

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });

const writeLocalized = (lang, html) => {
  const targetDir = path.join(DIST, lang);
  ensureDir(targetDir);
  fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf8");
};

const writeFlatForObjectStorage = (lang, html) => {
  const flatDir = path.join(DIST, "_flat");
  ensureDir(flatDir);
  fs.writeFileSync(path.join(flatDir, lang), html, "utf8");
};

const main = () => {
  if (!fs.existsSync(INDEX_PATH)) {
    console.error("dist/index.html not found. Run build first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(INDEX_PATH, "utf8");
  const ruLocale = readJson(path.join(ROOT, "src", "locales", "ru.json"));
  const enLocale = readJson(path.join(ROOT, "src", "locales", "en.json"));

  const ruHtml = replaceMeta(baseHtml, "ru", ruLocale);
  const enHtml = replaceMeta(baseHtml, "en", enLocale);

  writeLocalized("ru", ruHtml);
  writeLocalized("en", enHtml);
  writeFlatForObjectStorage("ru", ruHtml);
  writeFlatForObjectStorage("en", enHtml);
};

main();
