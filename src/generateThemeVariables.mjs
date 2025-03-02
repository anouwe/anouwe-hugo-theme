import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Color from 'color';
import * as TOML from '@iarna/toml';
import { load as loadYAML } from 'js-yaml';

// Pour obtenir __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Search for the project configuration file
const configFormats = ['config.toml', 'config.yaml', 'config.json'];
const projectRoot = process.cwd();

let themeVariables = {
  // Default values
  primaryColor: '#007B79',
  secondaryColor: '#113946',
  primaryFont: 'Poppins',
  lightChart: {
    50: 0.93,
    100: 0.82,
    200: 0.68,
    300: 0.45,
    400: 0.23
  },
  darkChart: {
    600: 0.22,
    700: 0.41,
    800: 0.60,
    900: 0.79
  }
};

// Search for the configuration file
for (const format of configFormats) {
  const configPath = path.resolve(projectRoot, format);
  
  if (fs.existsSync(configPath)) {
    try {
      const configFile = fs.readFileSync(configPath, 'utf8');
      let config;
      
      // Parse according to the format
      if (format === 'config.toml') {
        config = TOML.parse(configFile);
      } else if (format === 'config.yaml') {
        config = loadYAML(configFile);
      } else {
        config = JSON.parse(configFile);
      }
      
      // Extract theme variables
      if (config.params?.theme) {
        themeVariables = { ...themeVariables, ...config.params.theme };
      }
      
      break; // Stop after finding a valid configuration file
    } catch (error) {
      console.warn(`Erreur lors de la lecture de ${format}: ${error.message}`);
    }
  }
}

// Generate color shades
const generateShades = (baseColor, lightChart, darkChart) => {
  try {
    const color = Color(baseColor);
    const shades = {
      500: baseColor
    };
    
    Object.entries(lightChart).forEach(([shade, chart]) => {
      shades[shade] = color.mix(Color('white'), chart).hex();
    });
    
    Object.entries(darkChart).forEach(([shade, chart]) => {
      shades[shade] = color.mix(Color('black'), chart).hex();
    });
    
    return shades;
  } catch (e) {
    console.warn(`Erreur lors de la génération des nuances pour ${baseColor}: ${e.message}`);
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

// Create the data directory if it does not exist
const dataDir = path.resolve(projectRoot, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write the JSON file
fs.writeFileSync(
  path.resolve(dataDir, 'theme.json'), 
  JSON.stringify(themeVariables, null, 2)
);
console.log('Paramètres du thème générés avec succès dans data/theme.json');
