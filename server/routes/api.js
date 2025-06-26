import Router from 'express';
import CategoryRouter from './category.js';
import HubRouter from './hub.js';
import HubItemRouter from './item.js';

const ApiRouter = Router();
ApiRouter.use('/hub', HubRouter);
ApiRouter.use('/item', HubItemRouter);
ApiRouter.use('/category', CategoryRouter);

export default ApiRouter;