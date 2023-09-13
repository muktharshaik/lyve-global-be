import express from 'express';
import { restaurantRoutes } from '../components';

const app = express();

app.use('/api/restaurants', restaurantRoutes);

export default app;
