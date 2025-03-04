
// Retrieve CLI arguments manually
const args = process.argv.slice(2);
const src = args[0];
const destIndex = args.indexOf("-o") !== -1 ? args.indexOf("-o") + 1 : args.indexOf("--output") !== -1 ? args.indexOf("--output") + 1 : -1;
const dest = destIndex !== -1 && args[destIndex] ? args[destIndex] : "";

console.log(`Copying files from ${src} to ${dest}...`);

// Check and create the destination folder if necessary
if (!fs.existsSync(dest)) {
  console.log(`Creating destination folder: ${dest}`);
  fs.mkdirSync(dest, { recursive: true });
}

// Copy files
try {
  fs.cpSync(src, dest, { recursive: true });
  console.log("Copy completed successfully!");
} catch (error) {
  console.error(`Error during copy: ${error.message}`);
  process.exit(1);
}
