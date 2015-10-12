import matchModel from './db/models/game';
import koaBody from 'koa-body';
import koaRouter from 'koa-router';
const router = koaRouter({ prefix: '/matches' });
const bodyParser = koaBody();

import baseController from './baseController';
const base = baseController(matchModel);

// Get all matches
router.get('/', base.setJsonType, base.getAll);

// Get match
router.get('/:id', base.setJsonType, base.getById);

// Create match
router.post('/', bodyParser, base.setJsonType, base.createNew);

// Update match
router.put('/:id', bodyParser, base.setJsonType, base.updateById);

export default router;
