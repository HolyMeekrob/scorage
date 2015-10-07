import leagueModel from '../db/models/league';
import koaBody from 'koa-body';
import koaRouter from 'koa-router';
const router = koaRouter({ prefix: '/leagues' });
const bodyParser = koaBody();

import baseController from './baseController';
const base = baseController(leagueModel);

// Get all leagues
router.get('/', base.setJsonType, base.getAll);

// Get league
router.get('/:id', base.setJsonType, base.getById);

// Create league
router.post('/', bodyParser, base.setJsonType, base.createNew);

// Update league
router.put('/:id', bodyParser, base.setJsonType, base.updateById);

export default router;
