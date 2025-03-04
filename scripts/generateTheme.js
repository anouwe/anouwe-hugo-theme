import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Color from "color";
import * as TOML from "@iarna/toml";
import { load as loadYAML } from "js-yaml";

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Possible configuration file formats
const configFormats = ["config.toml", "config.yaml", "config.json"];
const projectRoot = process.cwd();

// Default values
let themeVariables = {
  primaryColor: "#007B79",
  secondaryColor: "#113946",
  primaryFont: {
    name: "Poppins",
    weight: [300, 400, 500, 600, 700],
    preload: true,
  },
  lightChart: { 50: 0.93, 100: 0.82, 200: 0.68, 300: 0.45, 400: 0.23 },
  darkChart: { 600: 0.22, 700: 0.41, 800: 0.6, 900: 0.79 },
};

// Parse CLI arguments for --output (-o) option
const args = process.argv.slice(2);
let outputDir = path.resolve(projectRoot, "assets/css");

const outputIndex = args.findIndex(arg => arg === "-o" || arg === "--output");
if (outputIndex !== -1 && args[outputIndex + 1]) {
  outputDir = path.resolve(projectRoot, args[outputIndex + 1]);
}

// Search for a configuration file
for (const format of configFormats) {
  const configPath = path.resolve(projectRoot, format);

  if (fs.existsSync(configPath)) {
    try {
      const configFile = fs.readFileSync(configPath, "utf8");
      let config;

      if (format === "config.toml") {
        config = TOML.parse(configFile);
      } else if (format === "config.yaml") {
        config = loadYAML(configFile);
      } else {
        config = JSON.parse(configFile);
      }

      if (config.params?.theme) {
        themeVariables = { ...themeVariables, ...config.params.theme };
      }

      break;
    } catch (error) {
      console.warn(`Error reading ${format}: ${error.message}`);
    }
  }
}

// Generate color shades
const generateShades = (baseColor, lightChart, darkChart) => {
  try {
    const color = Color(baseColor);
    const shades = { 500: baseColor };

    Object.entries(lightChart).forEach(([shade, chart]) => {
      shades[shade] = color.mix(Color("white"), chart).hex();
    });

    Object.entries(darkChart).forEach(([shade, chart]) => {
      shades[shade] = color.mix(Color("black"), chart).hex();
    });

    return shades;
  } catch (e) {
    console.warn(`Error generating shades for ${baseColor}: ${e.message}`);
    return {};
  }
};

themeVariables.primaryShades = generateShades(
  themeVariables.primaryColor,
  themeVariables.lightChart,
  themeVariables.darkChart
);
themeVariables.secondaryShades = generateShades(
  themeVariables.secondaryColor,
  themeVariables.lightChart,
  themeVariables.darkChart
);

// Create `data` directory if it does not exist
const dataDir = path.resolve(projectRoot, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write JSON configuration file
fs.writeFileSync(
  path.resolve(dataDir, "theme.json"),
  JSON.stringify(themeVariables, null, 2)
);
console.log("✅ Theme settings successfully written to data/theme.json");

// Create `outputDir` if it does not exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate `variables.css`
// Liste des polices système qui n'ont pas besoin d'importation
const systemFonts = ["Arial", "Helvetica", "Times New Roman", "Georgia", "Courier New", "sans-serif", "serif", "monospace"];

const primaryFont = themeVariables.primaryFont;
const needsFontFace = primaryFont && !systemFonts.includes(primaryFont.name);

const primaryFontCSS = primaryFont ? `"${primaryFont.name}", sans-serif` : "sans-serif";

let variablesCss = `:root {
  --primary-color: ${themeVariables.primaryColor};
  --secondary-color: ${themeVariables.secondaryColor};
  --primary-font: ${primaryFontCSS};

`;

Object.entries(themeVariables.primaryShades).forEach(([shade, color]) => {
  variablesCss += `  --primary-${shade}: ${color};\n`;
});
Object.entries(themeVariables.secondaryShades).forEach(([shade, color]) => {
  variablesCss += `  --secondary-${shade}: ${color};\n`;
});

variablesCss += `}\n`;

// Write `variables.css` file
fs.writeFileSync(path.resolve(outputDir, "variables.css"), variablesCss);
console.log(`✅ File variables.css generated in ${outputDir}`);

// Generate `fonts.css`
let fontsCss = "";

if (needsFontFace) {
  const fontName = themeVariables.primaryFont.name;
  const fontWeights = themeVariables.primaryFont.weight || [];

  fontWeights.forEach((weight) => {
    fontsCss += `
  @font-face {
    font-family: '${fontName}';
    src: url('/fonts/${fontName.toLowerCase()}/${fontName.toLowerCase()}-${weight}-webfont.woff2') format('woff2');
    font-weight: ${weight};
    font-style: normal;
    font-display: swap;
  }\n`;
  });
}
// Write `fonts.css` file (empty if no fonts are defined)
fs.writeFileSync(path.resolve(outputDir, "fonts.css"), fontsCss || "");
console.log(`✅ File fonts.css generated in ${outputDir}`);

console.log("🎉 All files have been successfully generated!");
