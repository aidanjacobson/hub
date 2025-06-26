class HubAPI {
    api;
    constructor(baseAPI) {
        this.api = baseAPI.use('/hub');
    }

    async getHubData() {
        return await this.api.get('/');
    }

    async cleanup() {
        return await this.api.post('/cleanup');
    }

    async reset() {
        return await this.api.post('/reset');
    }
}

export default HubAPI;