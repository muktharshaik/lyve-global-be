import { getRestaurants } from './categories.controller';
import express from 'express';

const router = express.Router();

router.get('/', getRestaurants);

export default router;
