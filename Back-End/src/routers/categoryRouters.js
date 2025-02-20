const express = require("express");
const { createCategory, getCategory, getCategoryById, deleteCategory, updateCategory } = require("../controllers/categoryControllers");

const router = express.Router();

router.post('/',createCategory);
router.get('/',getCategory);
router.get('/:id', getCategoryById);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);

module.exports = router;