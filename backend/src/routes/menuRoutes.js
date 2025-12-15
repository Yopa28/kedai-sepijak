// ============================================
// Menu Routes
// Kedai Sepijak Backend
// ============================================

const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Get all categories
// GET /api/menu/categories
router.get('/categories', menuController.getAllCategories);

// Get menu grouped by category
// GET /api/menu/by-category
router.get('/by-category', menuController.getMenuByCategory);

// Get all menu items
// GET /api/menu?category_id=1&is_available=true&is_featured=true&limit=100&offset=0
router.get('/', menuController.getAllMenuItems);

// Get menu item by ID
// GET /api/menu/:id
router.get('/:id', menuController.getMenuItemById);

// Create new menu item
// POST /api/menu
router.post('/', menuController.createMenuItem);

// Update menu item
// PUT /api/menu/:id
router.put('/:id', menuController.updateMenuItem);

// Delete menu item
// DELETE /api/menu/:id
router.delete('/:id', menuController.deleteMenuItem);

// Create new category
// POST /api/menu/categories
router.post('/categories', menuController.createCategory);

// Update category
// PUT /api/menu/categories/:id
router.put('/categories/:id', menuController.updateCategory);

// Delete category
// DELETE /api/menu/categories/:id
router.delete('/categories/:id', menuController.deleteCategory);

module.exports = router;
