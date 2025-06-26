class ItemAPI {
    api;
    constructor(baseAPI) {
        this.api = baseAPI.use('/item');
    }

    async getAll() {
        return await this.api.get('/');
    }

    async getById(id) {
        return await this.api.get(`/${id}`);
    }

    async create(item) {
        return await this.api.post('/create', item);
    }

    async update(id, item) {
        return await this.api.post(`/${id}/update`, item);
    }

    async delete(id) {
        return await this.api.post(`/${id}/delete`);
    }

    async reorder(id, newIndex) {
        return await this.api.post(`/${id}/reorder`, { newIndex });
    }
}

export default ItemAPI;