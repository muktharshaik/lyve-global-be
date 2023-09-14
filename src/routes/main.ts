import express from 'express';
import bodyParser from 'body-parser';
import { categoryRoutes, itemsRoutes, restaurantRoutes } from '../components';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/items', itemsRoutes);

export default app;
