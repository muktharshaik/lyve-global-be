import { Request, Response } from 'express';
import {
  addRestaurantToList,
  deleteRestaurantFromList,
  getRestaurantsList,
  updateRestaurantsInList,
} from './restaurant.service';
import Joi from 'joi';

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const data = await getRestaurantsList();
    if (data.status !== 200) {
      return res.send({
        status: 400,
        message: 'No data found!',
      });
    }
    return res.send({
      status: 200,
      data: data.data,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: 'Something went wrong!',
    });
  }
};

export const addRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, image, deliveryTime, rating, costRange } = req.body;
    const restaurantDataSchema = Joi.object({
      name: Joi.string().required(),
      image: Joi.string().required(),
      deliveryTime: Joi.string().required(),
      rating: Joi.number().required(),
      costRange: Joi.number().required(),
    });
    const { error } = restaurantDataSchema.validate({
      name,
      image,
      deliveryTime,
      rating,
      costRange,
    });
    if (error) {
      return res.send({
        status: 400,
        message: error.details[0].message,
      });
    }
    const data = await addRestaurantToList({
      name,
      image,
      deliveryTime,
      rating,
      costRange,
    });
    if (data.status !== 200) {
      return res.send({
        status: 400,
        message: 'Couldnt add restaurant!',
      });
    }
    return res.send({
      status: 200,
      message: data.message,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: 'Something went wrong!',
    });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { id, name, image, deliveryTime, rating, costRange } = req.body;
    const restaurantDataSchema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      image: Joi.string().required(),
      deliveryTime: Joi.string().required(),
      rating: Joi.number().required(),
      costRange: Joi.number().required(),
    });
    const { error } = restaurantDataSchema.validate({
      id,
      name,
      image,
      deliveryTime,
      rating,
      costRange,
    });
    if (error) {
      return res.send({
        status: 400,
        message: error.details[0].message,
      });
    }
    const data = await updateRestaurantsInList({
      id,
      name,
      image,
      deliveryTime,
      rating,
      costRange,
    });
    if (data.status !== 200) {
      return res.send({
        status: 400,
        message: 'Couldnt add restaurant!',
      });
    }
    return res.send({
      status: 200,
      data: data.data,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: 'Something went wrong!',
    });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const restaurantDataSchema = Joi.object({
      restaurantId: Joi.string().required(),
    });
    const { error } = restaurantDataSchema.validate({
      restaurantId,
    });
    if (error) {
      return res.send({
        status: 400,
        message: error.details[0].message,
      });
    }
    const data = await deleteRestaurantFromList(restaurantId);
    if (data.status !== 200) {
      return res.send({
        status: 400,
        message: 'Couldnt add restaurant!',
      });
    }
    return res.send({
      status: 200,
      data: data.message,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: 'Something went wrong!',
    });
  }
};
