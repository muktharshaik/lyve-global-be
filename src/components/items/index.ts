import { addItem, deleteItem, getItems, updateItems } from './items.controller';
import express from 'express';

const router = express.Router();

router.get('/:restaurantId/:categoryId', getItems);
router.post('/update', updateItems);
router.post('/add', addItem);
router.delete('/delete/:restaurantId/:categoryId/:itemId', deleteItem);

export default router;
