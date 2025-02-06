const express = require('express');
const { getNearbyUniversities } = require('../controllers/universitiesController');

const router = express.Router();

router.get('/', getNearbyUniversities);

module.exports = router;
