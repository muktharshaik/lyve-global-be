import { Request, Response } from 'express';

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    res.send({
      status: 200,
      message: 'Got them restaurants!',
    });
  } catch (error) {
    res.send({
      status: 500,
      message: 'Something went wrong!',
    });
  }
};
