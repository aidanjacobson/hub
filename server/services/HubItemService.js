import { v4 as uuidv4 } from 'uuid';
import HubService from './HubService.js';

export const HubItemService = {
  async getAll() {
    const hub = await HubService.getAll();
    return hub.items;
  },

  async getById(id) {
    const hub = await HubService.getAll();
    return hub.items.find(item => item.id === id) || null;
  },

  async getMany(ids) {
      const hub = await HubService.getAll();
      return hub.items.filter(item => ids.includes(item.id));
  },

    async add({ url, title, description, image }) {
      if (!url || typeof url !== 'string' || url.trim() === '') {
        throw new Error('Invalid or missing "url" field');
      }

        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new Error('Invalid or missing "title" field');
        }

      const hub = await HubService.getMutable();
      const item = {
        id: uuidv4(),
        url: url.trim(),
        title,
        description,
        image,
      };
      hub.items.push(item);
      await HubService.save();
      return item;
    },

  async update(id, updates) {
    const hub = await HubService.getMutable();
    const item = hub.items.find(item => item.id === id);
    if (!item) throw new Error(`Item ${id} not found`);

    Object.assign(item, updates);
    await HubService.save();
    return item;
  },

    async remove(id) {
      const hub = await HubService.getMutable();

      const originalLength = hub.items.length;
      hub.items = hub.items.filter(item => item.id !== id);

      if (hub.items.length === originalLength) {
        throw new Error(`Item ${id} not found`);
      }

      await HubService.cleanup(); // removes stale category refs
      await HubService.save();
    },

async reorder(id, newIndex) {
    const hub = await HubService.getMutable();
    const items = hub.items;
    const currentIndex = items.findIndex(item => item.id === id);

    if (currentIndex === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    if (newIndex < 0 || newIndex >= items.length) {
        throw new Error(`Invalid new index ${newIndex}`);
    }

    const [movedItem] = items.splice(currentIndex, 1);
    items.splice(newIndex, 0, movedItem);

    await HubService.save();
}
};

export default HubItemService;
