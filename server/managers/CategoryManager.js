import CategoryService from '../services/CategoryService.js';
import HubItemService from '../services/HubItemService.js';

export const CategoryManager = {
    async getAll() {
        return await CategoryService.getAll();
    },

    async getById(id) {
        return await CategoryService.getById(id);
    },

    async create(categoryData) {
        return await CategoryService.add(categoryData);
    },

    async update(id, updates) {
        return await CategoryService.update(id, updates);
    },

    async remove(id) {
        try {
            await CategoryService.remove(id);
            return { success: true, message: `Category ${id} deleted` };
        } catch (err) {
            return { success: false, error: err.message || `Failed to delete category ${id}` };
        }
    },

    async reorder(id, newIndex) {
        try {
            await CategoryService.reorder(id, newIndex);
            return { success: true, message: `Category ${id} reordered` };
        } catch (err) {
            return { success: false, error: err.message || `Failed to reorder category ${id}` };
        }
    },

    async getItems(categoryId) {
        const category = await this.getById(categoryId);
        if (!category) throw new Error(`Category ${categoryId} not found`);

        const items = await HubItemService.getMany(category.children);
        return items;
    },

    async addItemToCategory(categoryId, itemId) {
        try {
            await CategoryService.addItemToCategory(categoryId, itemId);
            return { success: true, message: `Item ${itemId} added to category ${categoryId}` };
        } catch (err) {
            return { success: false, error: err.message || `Failed to add item ${itemId} to category ${categoryId}` };
        }
    },

    async removeItemFromCategory(categoryId, itemId) {
        try {
            await CategoryService.removeItemFromCategory(categoryId, itemId);
            return { success: true, message: `Item ${itemId} removed from category ${categoryId}` };
        } catch (err) {
            return { success: false, error: err.message || `Failed to remove item ${itemId} from category ${categoryId}` };
        }
    },

    async reorderItemInCategory(categoryId, itemId, newIndex) {
        try {
            await CategoryService.reorderItemInCategory(categoryId, itemId, newIndex);
            return { success: true, message: `Item ${itemId} reordered in category ${categoryId}` };
        } catch (err) {
            return { success: false, error: err.message || `Failed to reorder item ${itemId} in category ${categoryId}` };
        }
    }
}

export default CategoryManager;