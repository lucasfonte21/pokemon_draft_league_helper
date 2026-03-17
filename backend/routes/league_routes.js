const express = require('express');
const router = express.Router();
const { createLeague, getUserLeagues, getLeagueById } = require('../controllers/league_controller');
const { protect } = require('../middleware/auth_middleware');

// When a POST request hits /api/leagues, verify the token first, THEN run createLeague
router.post('/', protect, createLeague);
router.get('/', protect, getUserLeagues);
router.get('/:id', protect, getLeagueById);

module.exports = router;