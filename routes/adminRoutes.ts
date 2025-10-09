import express from 'express';
import {
  updateMatchResult,
} from '../controllers/adminController';

const router = express.Router();

router.post('/update-match/:id', updateMatchResult);

export default router;
