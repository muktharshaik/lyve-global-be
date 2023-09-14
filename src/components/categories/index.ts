import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from './categories.controller';
import express from 'express';

const router = express.Router();

router.get('/:restaurantId', getCategories);
router.post('/update', updateCategory);
router.post('/add', addCategory);
router.delete('/delete/:restaurantId/:categoryId', deleteCategory);

export default router;
