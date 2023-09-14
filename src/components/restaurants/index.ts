import {
  addRestaurant,
  deleteRestaurant,
  getRestaurants,
  updateRestaurant,
} from './restaurant.controller';
import express from 'express';

const router = express.Router();

router.get('/', getRestaurants);
router.post('/add', addRestaurant);
router.post('/update', updateRestaurant);
router.delete('/delete/:restaurantId', deleteRestaurant);

export default router;
