const router =require('express').Router();
const userRoutes = require('./user-route');
const thoughts = require('./thoughts-route');
router.use('/users', userRoutes);
router.use('/thoughts', thoughts);
module.exports = router;