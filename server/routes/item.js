import HubItemManager from '../managers/HubItemManager.js';
import Router from 'express';

const HubItemRouter = Router();

HubItemRouter.get('/', async (req, res) => {
    res.json(await HubItemManager.getAll());
});

HubItemRouter.get('/:id', async (req, res) => {
    res.json(await HubItemManager.getById(req.params.id));
})

HubItemRouter.post('/create', async (req, res) => {
    const itemData = req.body;
    res.json(await HubItemManager.create(itemData));
});

HubItemRouter.post('/:id/update', async (req, res) => {
    const updates = req.body;
    const itemId = req.params.id;
    res.json(await HubItemManager.update(itemId, updates));
});

HubItemRouter.post('/:id/delete', async (req, res) => {
    const itemId = req.params.id;
    res.json(await HubItemManager.remove(itemId));
});

HubItemRouter.post('/:id/reorder', async (req, res) => {
    const { newIndex } = req.body;
    const itemId = req.params.id;
    res.json(await HubItemManager.reorder(itemId, newIndex));
});

export default HubItemRouter;