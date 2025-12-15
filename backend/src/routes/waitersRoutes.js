// ============================================
// Waiters Routes
// Kedai Sepijak Backend
// ============================================

const express = require('express');
const router = express.Router();
const waitersController = require('../controllers/waitersController');

// Get all waiters
// GET /api/waiters?status=active
router.get('/', waitersController.getAllWaiters);

// Get waiter by ID
// GET /api/waiters/:id
router.get('/:id', waitersController.getWaiterById);

// Get waiter statistics
// GET /api/waiters/:id/stats
router.get('/:id/stats', waitersController.getWaiterStats);

// Create new waiter
// POST /api/waiters
router.post('/', waitersController.createWaiter);

// Update waiter
// PUT /api/waiters/:id
router.put('/:id', waitersController.updateWaiter);

// Delete waiter
// DELETE /api/waiters/:id
router.delete('/:id', waitersController.deleteWaiter);

module.exports = router;
