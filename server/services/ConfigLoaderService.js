import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default locations for the config file
const DEFAULT_DEV_FILE = path.join(__dirname, '..', 'config', 'hub.dev.json');
const DEFAULT_PROD_FILE = '/config/hub.json';

/**
 * Decide where the config file lives.
 * Priority:
 *   1. process.env.CONFIG_PATH (explicit override)
 *   2. /config/hub.json when NODE_ENV === 'production'
 *   3. ./server/config/hub.dev.json in dev
 * @returns {string} Absolute path to the JSON file
 */
export function getConfigPath() {
  return process.env.CONFIG_PATH
    ? path.resolve(process.env.CONFIG_PATH)
    : process.env.NODE_ENV === 'production'
    ? DEFAULT_PROD_FILE
    : DEFAULT_DEV_FILE;
}

/**
 * Read and parse the JSON config.
 * If the file doesn't exist, return an empty object.
 * @returns {Promise<object>} Parsed configuration object
 */
export async function loadConfig() {
  const filePath = getConfigPath();
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    if (raw.trim() === '') return {}; // Handle empty file gracefully
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return {}; // File doesn't exist
    throw new Error(`Failed to load config at ${filePath}: ${err.message}`);
  }
}

/**
 * Persist the configuration back to disk (pretty-printed 2-space JSON).
 * Ensures directory exists and creates the file if missing.
 * @param {object} config – Plain JS object to write
 */
export async function saveConfig(config) {
  const filePath = getConfigPath();
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(config, null, 2), 'utf8');
  } catch (err) {
    throw new Error(`Failed to save config at ${filePath}: ${err.message}`);
  }
}

// Handy aggregate export
export default {
  getConfigPath,
  loadConfig,
  saveConfig,
};
