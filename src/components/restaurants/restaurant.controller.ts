import { Request, Response } from 'express';
import { getRestaurantsList } from './restaurant.service';

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const data = await getRestaurantsList();
    res.send({
      status: 200,
      data,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: 'Something went wrong!',
    });
  }
};
