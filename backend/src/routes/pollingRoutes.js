// ============================================
// Polling Routes – Kedai Sepijak Backend
// ============================================

const express = require('express');
const router = express.Router();
const pollingController = require('../controllers/pollingController');

// PUBLIC (frontend)
router.get('/active', pollingController.getActivePoll);
router.post('/:pollId/vote', pollingController.submitVote);

// ADMIN (dashboard)
router.get('/', pollingController.listPolls);
router.post('/', pollingController.createPoll);
router.patch('/:pollId/toggle', pollingController.togglePollStatus);
router.delete('/:pollId', pollingController.deletePoll);
router.get('/:pollId', pollingController.getPollById);
router.get('/:pollId/votes', pollingController.getPollVotes);

module.exports = router;
