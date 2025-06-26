import CategoryManager from '../managers/categoryManager.js';
import Router from 'express';

const CategoryRouter = Router();

CategoryRouter.get('/', async (req, res) => {
    res.json(await CategoryManager.getAll());
});

CategoryRouter.get('/:id', async (req, res) => {
    const categoryId = req.params.id;
    const category = await CategoryManager.getById(categoryId);
    if (!category) {
        return res.status(404).json({ error: `Category ${categoryId} not found` });
    }
    res.json(category);
});

CategoryRouter.post('/create', async (req, res) => {
    const newCategory = req.body;
    res.json(await CategoryManager.create(newCategory));
});

CategoryRouter.post('/:id/update', async (req, res) => {
    const categoryId = req.params.id;
    const updatedData = req.body;
    res.json(await CategoryManager.update(categoryId, updatedData));
});

CategoryRouter.post('/:id/delete', async (req, res) => {
    const categoryId = req.params.id;
    res.json(await CategoryManager.remove(categoryId));
});

CategoryRouter.post('/:id/reorder', async (req, res) => {
    const categoryId = req.params.id;
    const newOrder = req.body.newIndex;
    res.json(await CategoryManager.reorder(categoryId, newOrder));
});

CategoryRouter.get('/:catId/items', async (req, res) => {
    const categoryId = req.params.catId;
    res.json(await CategoryManager.getItems(categoryId));
});

CategoryRouter.post('/:catId/items/add', async (req, res) => {
    const categoryId = req.params.catId;
    const { itemId } = req.body;
    res.json(await CategoryManager.addItemToCategory(categoryId, itemId));
});

CategoryRouter.post('/:catId/items/delete', async (req, res) => {
    const categoryId = req.params.catId;
    const { itemId } = req.body;
    res.json(await CategoryManager.removeItemFromCategory(categoryId, itemId));
});

CategoryRouter.post('/:catId/items/:itemId/reorder', async (req, res) => {
    const categoryId = req.params.catId;
    const itemId = req.params.itemId;
    const { newIndex } = req.body;
    res.json(await CategoryManager.reorderItemInCategory(categoryId, itemId, newIndex));
});

export default CategoryRouter;