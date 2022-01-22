const express = require('express');

const router = express.Router();

const followerController = require('../controllers/followerController')


router.get('/followers', followerController.suggestUser)




module.exports = router