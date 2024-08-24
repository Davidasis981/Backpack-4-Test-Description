const express = require('express');
const UserController = require('../controllers/userController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/register', upload.single('photo'), UserController.registerUser);

module.exports = router;
