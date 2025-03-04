import { optimize } from 'svgo';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current execution directory
const cwd = process.cwd();

// Parse CLI arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("❌ Error: No source directory specified.\nUsage: node script.js <source-directory> [-o <output-directory>]");
  process.exit(1);
}

// Resolve source directory based on execution path
const sourceDir = path.resolve(cwd, args[0]); // First argument is the source directory
let destDir = cwd; // Default output is the current directory

const outputIndex = args.findIndex(arg => arg === "-o" || arg === "--output");
if (outputIndex !== -1 && args[outputIndex + 1]) {
  destDir = path.resolve(cwd, args[outputIndex + 1]); // Resolve relative to execution path
}

// SVGO configuration
const svgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIDs: false
        }
      }
    }
  ]
};

// Function to optimize SVG files
const optimizeSVGs = async () => {
  try {
    // Check if source directory exists
    try {
      await fs.access(sourceDir);
    } catch {
      console.error(`❌ Error: Source directory does not exist -> ${sourceDir}`);
      process.exit(1);
    }

    // Ensure the output directory exists
    await fs.mkdir(destDir, { recursive: true });

    // Read files in source directory
    const files = await fs.readdir(sourceDir);
    
    // Process SVG files
    const tasks = files
      .filter(file => path.extname(file).toLowerCase() === '.svg')
      .map(async file => {
        const sourcePath = path.join(sourceDir, file);
        const destPath = path.join(destDir, file);

        const svg = await fs.readFile(sourcePath, 'utf8');
        const result = optimize(svg, svgoConfig);

        await fs.writeFile(destPath, result.data);
        console.log(`✅ Optimized: ${file}`);
      });

    await Promise.all(tasks);
    console.log(`🎉 SVG optimization completed. Files saved in: ${destDir}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
};

// Run the optimization
optimizeSVGs();
