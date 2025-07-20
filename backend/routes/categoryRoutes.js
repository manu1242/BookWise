const express = require("express");
const router = express.Router();
const Category = require('../models/Category');

const {
  getAllCategories,
  addCategory,
} = require("../controllers/categoryController");

// routes/categoryRoutes.js
router.delete('/api/categories/:id', async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('DELETE ERROR:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


router.get("/", getAllCategories);        
router.post("/add", addCategory);         

module.exports = router;
