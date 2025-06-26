import HubManager from '../managers/HubManager.js';
import Router from 'express';

const HubRouter = Router();

HubRouter.get('/', async (req, res) => {
    res.json(await HubManager.getAll());
});

HubRouter.post('/cleanup', async (req, res) => {
    res.json(await HubManager.cleanup());
});

HubRouter.post('/reset', async (req, res) => {
    res.json(await HubManager.reset());
});

export default HubRouter;