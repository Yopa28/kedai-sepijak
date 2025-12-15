// ============================================
// Menu Controller
// Kedai Sepijak Backend
// ============================================

const { query } = require('../config/database');

// Get all menu items with categories
const getAllMenuItems = async (req, res) => {
    try {
        const { category_id, is_available, is_featured, limit = 100, offset = 0 } = req.query;

        let sql = `
            SELECT
                mi.*,
                mc.name as category_name,
                mc.description as category_description
            FROM menu_items mi
            LEFT JOIN menu_categories mc ON mi.category_id = mc.id
            WHERE 1=1
        `;
        const params = [];

        if (category_id) {
            sql += ' AND mi.category_id = ?';
            params.push(category_id);
        }

        if (is_available !== undefined) {
            sql += ' AND mi.is_available = ?';
            params.push(is_available === 'true' ? 1 : 0);
        }

        if (is_featured !== undefined) {
            sql += ' AND mi.is_featured = ?';
            params.push(is_featured === 'true' ? 1 : 0);
        }

        sql += ' ORDER BY mi.display_order ASC, mi.name ASC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const results = await query(sql, params);

        // Get total count
        let countSql = 'SELECT COUNT(*) as total FROM menu_items mi WHERE 1=1';
        const countParams = [];

        if (category_id) {
            countSql += ' AND mi.category_id = ?';
            countParams.push(category_id);
        }

        if (is_available !== undefined) {
            countSql += ' AND mi.is_available = ?';
            countParams.push(is_available === 'true' ? 1 : 0);
        }

        if (is_featured !== undefined) {
            countSql += ' AND mi.is_featured = ?';
            countParams.push(is_featured === 'true' ? 1 : 0);
        }

        const [countResult] = await query(countSql, countParams);

        res.status(200).json({
            success: true,
            message: 'Menu items retrieved successfully',
            data: results,
            pagination: {
                total: countResult.total,
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: countResult.total > parseInt(offset) + results.length
            }
        });
    } catch (error) {
        console.error('Error getting menu items:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve menu items',
            error: error.message
        });
    }
};

// Get menu items by category
const getMenuByCategory = async (req, res) => {
    try {
        const sql = `
            SELECT
                mc.id as category_id,
                mc.name as category_name,
                mc.description as category_description,
                mc.display_order,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', mi.id,
                        'name', mi.name,
                        'description', mi.description,
                        'price', mi.price,
                        'image_url', mi.image_url,
                        'is_available', mi.is_available,
                        'is_featured', mi.is_featured
                    )
                ) as items
            FROM menu_categories mc
            LEFT JOIN menu_items mi ON mc.id = mi.category_id AND mi.is_available = TRUE
            WHERE mc.is_active = TRUE
            GROUP BY mc.id, mc.name, mc.description, mc.display_order
            ORDER BY mc.display_order ASC
        `;

        const results = await query(sql);

        res.status(200).json({
            success: true,
            message: 'Menu retrieved successfully',
            data: results
        });
    } catch (error) {
        console.error('Error getting menu by category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve menu',
            error: error.message
        });
    }
};

// Get menu item by ID
const getMenuItemById = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `
            SELECT
                mi.*,
                mc.name as category_name,
                mc.description as category_description
            FROM menu_items mi
            LEFT JOIN menu_categories mc ON mi.category_id = mc.id
            WHERE mi.id = ?
        `;

        const results = await query(sql, [id]);

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Menu item retrieved successfully',
            data: results[0]
        });
    } catch (error) {
        console.error('Error getting menu item by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve menu item',
            error: error.message
        });
    }
};

// Create new menu item
const createMenuItem = async (req, res) => {
    try {
        const { category_id, name, description, price, image_url, is_available, is_featured, display_order } = req.body;

        // Validation
        if (!category_id || !name || !price) {
            return res.status(400).json({
                success: false,
                message: 'Category ID, name, and price are required'
            });
        }

        if (price < 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be a positive number'
            });
        }

        // Check if category exists
        const checkCategorySql = 'SELECT id FROM menu_categories WHERE id = ? AND is_active = TRUE';
        const [category] = await query(checkCategorySql, [category_id]);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found or inactive'
            });
        }

        const sql = `
            INSERT INTO menu_items (category_id, name, description, price, image_url, is_available, is_featured, display_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            category_id,
            name,
            description || null,
            price,
            image_url || null,
            is_available !== undefined ? is_available : true,
            is_featured !== undefined ? is_featured : false,
            display_order || 0
        ];

        const result = await query(sql, params);

        // Get the created menu item
        const [newMenuItem] = await query(`
            SELECT mi.*, mc.name as category_name
            FROM menu_items mi
            LEFT JOIN menu_categories mc ON mi.category_id = mc.id
            WHERE mi.id = ?
        `, [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Menu item created successfully',
            data: newMenuItem
        });
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create menu item',
            error: error.message
        });
    }
};

// Update menu item
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_id, name, description, price, image_url, is_available, is_featured, display_order } = req.body;

        const updateFields = [];
        const params = [];

        if (category_id !== undefined) {
            // Check if category exists
            const checkCategorySql = 'SELECT id FROM menu_categories WHERE id = ? AND is_active = TRUE';
            const [category] = await query(checkCategorySql, [category_id]);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found or inactive'
                });
            }

            updateFields.push('category_id = ?');
            params.push(category_id);
        }

        if (name !== undefined) {
            updateFields.push('name = ?');
            params.push(name);
        }

        if (description !== undefined) {
            updateFields.push('description = ?');
            params.push(description);
        }

        if (price !== undefined) {
            if (price < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Price must be a positive number'
                });
            }
            updateFields.push('price = ?');
            params.push(price);
        }

        if (image_url !== undefined) {
            updateFields.push('image_url = ?');
            params.push(image_url);
        }

        if (is_available !== undefined) {
            updateFields.push('is_available = ?');
            params.push(is_available);
        }

        if (is_featured !== undefined) {
            updateFields.push('is_featured = ?');
            params.push(is_featured);
        }

        if (display_order !== undefined) {
            updateFields.push('display_order = ?');
            params.push(display_order);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields to update'
            });
        }

        params.push(id);

        const sql = `UPDATE menu_items SET ${updateFields.join(', ')} WHERE id = ?`;
        const result = await query(sql, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Menu item updated successfully'
        });
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update menu item',
            error: error.message
        });
    }
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = 'DELETE FROM menu_items WHERE id = ?';
        const result = await query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Menu item deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete menu item',
            error: error.message
        });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const sql = `
            SELECT
                mc.*,
                COUNT(mi.id) as total_items,
                SUM(CASE WHEN mi.is_available = TRUE THEN 1 ELSE 0 END) as available_items
            FROM menu_categories mc
            LEFT JOIN menu_items mi ON mc.id = mi.category_id
            WHERE mc.is_active = TRUE
            GROUP BY mc.id
            ORDER BY mc.display_order ASC
        `;

        const results = await query(sql);

        res.status(200).json({
            success: true,
            message: 'Categories retrieved successfully',
            data: results
        });
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve categories',
            error: error.message
        });
    }
};

// Create new category
const createCategory = async (req, res) => {
    try {
        const { name, description, display_order } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        const sql = `
            INSERT INTO menu_categories (name, description, display_order, is_active)
            VALUES (?, ?, ?, TRUE)
        `;

        const result = await query(sql, [name, description || null, display_order || 0]);

        const [newCategory] = await query('SELECT * FROM menu_categories WHERE id = ?', [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: newCategory
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create category',
            error: error.message
        });
    }
};

// Update category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, display_order, is_active } = req.body;

        const updateFields = [];
        const params = [];

        if (name !== undefined) {
            updateFields.push('name = ?');
            params.push(name);
        }

        if (description !== undefined) {
            updateFields.push('description = ?');
            params.push(description);
        }

        if (display_order !== undefined) {
            updateFields.push('display_order = ?');
            params.push(display_order);
        }

        if (is_active !== undefined) {
            updateFields.push('is_active = ?');
            params.push(is_active);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields to update'
            });
        }

        params.push(id);

        const sql = `UPDATE menu_categories SET ${updateFields.join(', ')} WHERE id = ?`;
        const result = await query(sql, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category updated successfully'
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update category',
            error: error.message
        });
    }
};

// Delete category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if category has menu items
        const checkItemsSql = 'SELECT COUNT(*) as item_count FROM menu_items WHERE category_id = ?';
        const [itemCheck] = await query(checkItemsSql, [id]);

        if (itemCheck.item_count > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete category with existing menu items. Move or delete items first.'
            });
        }

        const sql = 'DELETE FROM menu_categories WHERE id = ?';
        const result = await query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete category',
            error: error.message
        });
    }
};

module.exports = {
    getAllMenuItems,
    getMenuByCategory,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
