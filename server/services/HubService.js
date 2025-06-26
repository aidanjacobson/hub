import { loadConfig, saveConfig } from './ConfigLoaderService.js';

// Internal cache (optional depending on your architecture)
let hubData = null;

async function ensureLoaded() {
  if (!hubData) hubData = await loadConfig();
  hubData.items ??= [];
  hubData.categories ??= [];
}

export const HubService = {
  /** Load and return the full hub config (items + categories) */
  async getAll() {
    await ensureLoaded();
    return hubData;
  },

  /** Replace entire hub data object (use with caution) */
  async replaceAll(newData) {
    hubData = {
      items: newData.items || [],
      categories: newData.categories || [],
    };
    await saveConfig(hubData);
  },

  /** Save current in-memory hubData to disk */
  async save() {
    if (!hubData) throw new Error('Hub data not loaded');
    await saveConfig(hubData);
  },

  /** Provide direct access to the mutable hubData (internal use only) */
  async getMutable() {
    await ensureLoaded();
    return hubData;
  },

  async  cleanup() {
      await ensureLoaded();
      const validIds = new Set(hubData.items.map(item => item.id));
      let modified = false;

      for (const category of hubData.categories) {
        const originalLength = category.children.length;
        category.children = category.children.filter(id => validIds.has(id));
        if (category.children.length !== originalLength) {
          modified = true;
        }
      }

      if (modified) {
        await saveConfig(hubData);
      }
    }
};



export default HubService;
