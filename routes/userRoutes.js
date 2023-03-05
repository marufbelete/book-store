const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// login
router.post('/login', userController.login);
// Add Book To User 
router.post('/register',userController.register);


module.exports = router;
