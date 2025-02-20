const express = require("express");
const { createAdmin, getAdmin, getAdminById, deleteAdmin, updateAdmin } = require("../controllers/adminControllers");

const router = express.Router();

router.post('/',createAdmin);
router.get('/',getAdmin);
router.get('/:id', getAdminById);
router.delete('/:id', deleteAdmin);
router.put('/:id', updateAdmin);


module.exports = router;