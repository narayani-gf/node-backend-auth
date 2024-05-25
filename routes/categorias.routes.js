const router = require('express').Router();
const categorias = require('../controllers/categorias.controller')
const Authorize = require('../middlewares/auth.middleware')

// GET: api/categorias
router.get('/', Authorize('Administrador'), categorias.getAll);

// GET: api/categorias/5
router.get('/:id', Authorize('Administrador'), categorias.get);

// POST: api/categorias
router.post('/', Authorize('Administrador'), categorias.create);

// PUT: api/categorias/5
router.put('/:id', Authorize('Administrador'), categorias.update);

// DELETE: api/categorias/5
router.delete('/:id', Authorize('Administrador'), categorias.delete);

module.exports = router