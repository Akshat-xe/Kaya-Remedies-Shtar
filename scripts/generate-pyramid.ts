import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputArg = process.argv[2];
const RAW_DIR = inputArg ? path.resolve(process.cwd(), inputArg) : path.join(process.cwd(), "src", "raw-images");
const OUT_DIR = path.join(process.cwd(), "public", "deepzoom");
const THUMB_DIR = path.join(process.cwd(), "public", "thumbnails");

// Ensure directories exist
if (!fs.existsSync(RAW_DIR)) {
  fs.mkdirSync(RAW_DIR, { recursive: true });
}
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
if (!fs.existsSync(THUMB_DIR)) {
  fs.mkdirSync(THUMB_DIR, { recursive: true });
}

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tiff", ".tif"]);

// Helper to recursively walk a directory
function getFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getFilesRecursively(fullPath));
      } else {
        const ext = path.extname(file).toLowerCase();
        if (SUPPORTED_EXTENSIONS.has(ext)) {
          results.push(fullPath);
        }
      }
    }
  } catch (err) {
    console.error(`Error scanning directory ${dir}:`, err);
  }
  return results;
}

async function run() {
  console.log("⚡ Starting Deep Zoom Image (DZI) slicing and thumbnail generation...");
  console.log(`📂 Input Directory: ${RAW_DIR}`);
  console.log(`📂 Output Directory: ${OUT_DIR}`);
  console.log(`📂 Thumb Directory: ${THUMB_DIR}`);
  
  const imageFiles = getFilesRecursively(RAW_DIR);

  if (imageFiles.length === 0) {
    console.log(`ℹ️  No raw images found in ${RAW_DIR}.`);
    return;
  }

  console.log(`🔍 Found ${imageFiles.length} raw images recursively.`);

  for (const filePath of imageFiles) {
    const relativePath = path.relative(RAW_DIR, filePath);
    const ext = path.extname(relativePath);
    const dirName = path.dirname(relativePath);
    const baseName = path.basename(relativePath, ext);
    
    // Create a flat slug like "med1_pasted_image_2"
    const folderPrefix = dirName === "." ? "" : dirName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase() + "_";
    const fileSlug = baseName.replace(/[^a-zA-Z0-9-_]/g, "_").toLowerCase();
    const slug = `${folderPrefix}${fileSlug}`;
    
    const dziName = `${slug}.dzi`;
    const dziPath = path.join(OUT_DIR, dziName);
    const tilesDir = path.join(OUT_DIR, `${slug}_files`);
    const thumbPath = path.join(THUMB_DIR, `${slug}.jpg`);

    // Slicing check
    let sliced = false;
    if (fs.existsSync(dziPath) && fs.existsSync(tilesDir)) {
      console.log(`⏩ Skipping slice for "${relativePath}" - already sliced into ${dziName}`);
      sliced = true;
    } else {
      console.log(`🔪 Slicing "${relativePath}" into Deep Zoom pyramid format...`);
      const startTime = Date.now();
      try {
        const sharpOutputPath = path.join(OUT_DIR, slug);
        await sharp(filePath)
          .tile({
            size: 256,
            overlap: 1,
            layout: "dz",
          })
          .toFile(sharpOutputPath);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`✅ Finished slice "${relativePath}" -> Created public/deepzoom/${dziName} (took ${duration}s)`);
        sliced = true;
      } catch (err) {
        console.error(`❌ Failed to slice "${relativePath}":`, err);
      }
    }

    // Thumbnail generation check
    if (sliced && !fs.existsSync(thumbPath)) {
      console.log(`🖼️  Generating thumbnail for "${relativePath}"...`);
      try {
        await sharp(filePath)
          .resize(600) // 600px width, preserve aspect ratio
          .jpeg({ quality: 85 })
          .toFile(thumbPath);
        console.log(`✅ Created thumbnail: public/thumbnails/${slug}.jpg`);
      } catch (err) {
        console.error(`❌ Failed to create thumbnail for "${relativePath}":`, err);
      }
    } else if (sliced) {
      console.log(`⏩ Skipping thumbnail for "${relativePath}" - already exists`);
    }
  }

  console.log("🎉 Deep Zoom Image slicing and thumbnail generation complete!");
}

run();
