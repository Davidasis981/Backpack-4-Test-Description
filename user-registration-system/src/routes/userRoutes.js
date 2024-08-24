const express = require('express');
const UserController = require('../controllers/userController');

const upload = require('../middlewares/upload');
const { authenticateJWT, authorizeRoles } = require('../middlewares/auth');

const {
    registerUserValidation,
    loginUserValidation,
    updateUserValidation,
    handleValidationErrors
} = require('../validators/userValidator');

const router = express.Router();

router.post('/register', registerUserValidation, handleValidationErrors, upload.single('photo'), UserController.registerUser);
router.get('/inactives', UserController.getInactiveUsers);
router.post('/login', loginUserValidation, handleValidationErrors, UserController.loginUser);
router.put('/profile', updateUserValidation, handleValidationErrors, authenticateJWT, UserController.updateUser);
router.get('/getallusers', authenticateJWT, authorizeRoles('admin'), UserController.getAllUsers);
router.get('/getalluserdocs', authenticateJWT, authorizeRoles('admin'), UserController.getAllUserdocs);

router.get('/admin-only', authenticateJWT, authorizeRoles('admin'), (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'This route is restricted to admin users'
    });
}); // example for admin role access


module.exports = router;
