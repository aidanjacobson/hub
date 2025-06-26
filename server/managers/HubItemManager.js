import HubItemService from '../services/HubItemService.js';

export const HubItemManager = {
    async getAll() {
        return await HubItemService.getAll();
    },

    async getById(id) {
        return await HubItemService.getById(id);
    },

    async create(itemData) {
        return await HubItemService.add(itemData);
    },

    async update(id, updates) {
        return await HubItemService.update(id, updates);
    },

    async remove(id) {
        try {
            await HubItemService.remove(id);
            return { success: true, message: `Item ${id} deleted` };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to delete item' };
        }
    },

    async reorder(id, newIndex) {
        try {
            await HubItemService.reorder(id, newIndex);
            return { success: true, message: `Item ${id} reordered to index ${newIndex}` };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to reorder item' };
        }
    }
}

export default HubItemManager;