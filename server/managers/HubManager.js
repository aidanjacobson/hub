import HubService from '../services/HubService.js';

export const HubManager = {
    async getAll() {
        return await HubService.getAll();
    },

    async cleanup() {
        try {
            await HubService.cleanup();
            return { success: true, message: "Cleaned up successfully" };
        } catch(e) {
            console.error("Cleanup failed:", e);
            return { success: false, message: e.message };
        }
    },

    async reset() {
        try {
            await HubService.replaceAll({ items: [], categories: [] });
            return { success: true, message: "Hub reset successfully" };
        } catch (e) {
            console.error("Reset failed:", e);
            return { success: false, message: e.message };
        }
    }
}

export default HubManager;