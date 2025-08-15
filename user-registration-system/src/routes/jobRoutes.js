const express = require('express');
const JobController = require('../controllers/jobController');
const { authenticateJWT, authorizeRoles } = require('../middlewares/auth');

const { 
    addJobValidation, 
    removeJobValidation,
    handleValidationErrors
} = require('../validators/jobValidator');

const router = express.Router();

router.post('/', addJobValidation, handleValidationErrors, authenticateJWT, authorizeRoles('admin'), JobController.addJob);
router.delete('/:id', removeJobValidation, handleValidationErrors, authenticateJWT, authorizeRoles('admin'), JobController.removeJob);
router.get('/', authenticateJWT, authorizeRoles('admin'), JobController.getAllJobs);

const activateInactiveUsers = require('../jobs/activateInactiveUsers');
router.put('/activteusers', activateInactiveUsers);

module.exports = router;
