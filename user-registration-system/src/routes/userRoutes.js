const express = require('express');
const UserController = require('../controllers/userController');

const upload = require('../middlewares/upload');
const { authenticateJWT, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', upload.single('photo'), UserController.registerUser);
router.post('/login', UserController.loginUser);
router.put('/profile', authenticateJWT, UserController.updateUser);
router.get('/admin-only', authenticateJWT, authorizeRoles('admin'), (req, res) => {
    res.send('This route is restricted to admin users');
}); // example for admin role access


module.exports = router;
