const express = require('express');

const router = express.Router();

const followerController = require('../controllers/followers')


router.get('/followers', followerController.suggestUser)




module.exports = router