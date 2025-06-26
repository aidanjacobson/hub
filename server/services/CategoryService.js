import { v4 as uuidv4 } from 'uuid';
import HubService from './HubService.js';

export const CategoryService = {
  async getAll() {
    const hub = await HubService.getAll();
    return hub.categories;
  },

  async getById(id) {
    const hub = await HubService.getAll();
    return hub.categories.find(cat => cat.id === id) || null;
  },

  async add({ name }) {
    const hub = await HubService.getMutable();
    const category = {
      id: uuidv4(),
      name,
      children: [],
    };
    hub.categories.push(category);
    await HubService.save();
    return category;
  },

  async update(id, updates) {
    const hub = await HubService.getMutable();
    const category = hub.categories.find(cat => cat.id === id);
    if (!category) throw new Error(`Category ${id} not found`);

    Object.assign(category, updates);
    await HubService.save();
    return category;
  },

  async remove(id) {
    const hub = await HubService.getMutable();
    hub.categories = hub.categories.filter(cat => cat.id !== id);
    await HubService.save();
  },

  async addItemToCategory(categoryId, itemId) {
    const hub = await HubService.getMutable();
    const category = hub.categories.find(cat => cat.id === categoryId);
    if (!category) throw new Error(`Category ${categoryId} not found`);
    if (!category.children.includes(itemId)) {
      category.children.push(itemId);
      await HubService.save();
    }
  },

  async removeItemFromCategory(categoryId, itemId) {
    const hub = await HubService.getMutable();
    const category = hub.categories.find(cat => cat.id === categoryId);
    if (!category) throw new Error(`Category ${categoryId} not found`);
    category.children = category.children.filter(id => id !== itemId);
    await HubService.save();
  },

  async reorderItemInCategory(categoryId, itemId, newIndex) {
    const hub = await HubService.getMutable();
    const category = hub.categories.find(cat => cat.id === categoryId);
    if (!category) throw new Error(`Category ${categoryId} not found`);

    const currentIndex = category.children.indexOf(itemId);
    if (currentIndex === -1) throw new Error(`Item ${itemId} not found in category ${categoryId}`);

    if (newIndex < 0 || newIndex >= category.children.length) {
        throw new Error(`Invalid new index ${newIndex}`);
    }

    category.children.splice(currentIndex, 1);
    category.children.splice(newIndex, 0, itemId);

    await HubService.save();
},

async reorderCategory(categoryId, newIndex) {
    const hub = await HubService.getMutable();
    const currentIndex = hub.categories.findIndex(cat => cat.id === categoryId);

    if (currentIndex === -1) throw new Error(`Category ${categoryId} not found`);
    if (newIndex < 0 || newIndex >= hub.categories.length) {
        throw new Error(`Invalid new index ${newIndex}`);
    }

    const [moved] = hub.categories.splice(currentIndex, 1);
    hub.categories.splice(newIndex, 0, moved);

    await HubService.save();
}

};

export default CategoryService;
