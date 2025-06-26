class CategoryAPI {
    api;
    constructor(baseAPI) {
        this.api = baseAPI.use('/category');
    }

    async getAll() {
        return await this.api.get('/');
    }

    async getById(id) {
        return await this.api.get(`/${id}`);
    }

    async create(category) {
        return await this.api.post('/create', category);
    }

    async update(id, category) {
        return await this.api.post(`/${id}/update`, category);
    }

    async delete(id) {
        return await this.api.post(`/${id}/delete`);
    }

    async reorder(id, newIndex) {
        return await this.api.post(`/${id}/reorder`, { newIndex });
    }

    async getItemsByCategoryId(id) {
        return await this.api.get(`/${id}/items`);
    }

    async addItemToCategory(categoryId, itemId) {
        return await this.api.post(`/${categoryId}/items/add`, { itemId });
    }

    async removeItemFromCategory(categoryId, itemId) {
        return await this.api.post(`/${categoryId}/items/${itemId}/delete`);
    }

    async reorderItemInCategory(categoryId, itemId, newIndex) {
        return await this.api.post(`/${categoryId}/items/${itemId}/reorder`, { newIndex });
    }
}

export default CategoryAPI;