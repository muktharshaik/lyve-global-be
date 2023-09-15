import { Request, Response } from 'express';
import {
  addCategoryToRestaurant,
  deleteCategoryFromRestaurant,
  getCategoryList,
  updateCategoryList,
} from './categories.service';
import joi from 'joi';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const paramsSchema = joi.object({
      restaurantId: joi.string(),
    });
    const { error } = paramsSchema.validate({
      restaurantId,
    });
    if (error) {
      return res.send({
        status: 400,
        message: error.details[0].message,
      });
    }
    const data = await getCategoryList(restaurantId);
    if (data.status !== 200) {
      return res.send({
        status: data.status,
        message: data.message,
      });
    }
    return res.send({
      status: 200,
      message: 'Got them restaurants!',
      response: data.data,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: 'Something went wrong!',
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { restaurantId, categoryId, categoryName } = req.body;
    const paramsSchema = joi.object({
      restaurantId: joi.string(),
      categoryId: joi.string(),
      categoryName: joi.string(),
    });
    const { error } = paramsSchema.validate({
      restaurantId,
      categoryId,
      categoryName,
    });
    if (error) {
      return res.send({
        status: 400,
        message: error.details[0].message,
      });
    }
    const data = await updateCategoryList(
      restaurantId,
      categoryId,
      categoryName
    );
    if (data.status !== 200) {
      return res.send({
        status: data.status,
        message: data.message,
      });
    }
    return res.send({
      status: 200,
      response: true,
      message: 'Category updated successfully!',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: 'Something went wrong!',
      error: error.message,
    });
  }
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { restaurantId, categoryName } = req.body;
    const paramsSchema = joi.object({
      restaurantId: joi.string(),
      categoryName: joi.string(),
    });
    const { error } = paramsSchema.validate({
      restaurantId,
      categoryName,
    });
    if (error) {
      return res.send({
        status: 400,
        message: error.details[0].message,
      });
    }
    const data = await addCategoryToRestaurant(restaurantId, categoryName);
    if (data.status !== 200) {
      return res.send({
        status: data.status,
        message: data.message,
      });
    }
    return res.send({
      status: 200,
      response: true,
      message: 'Category added successfully!',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: 'Something went wrong!',
      error: error.message,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { restaurantId, categoryId } = req.params;
    const paramsSchema = joi.object({
      restaurantId: joi.string(),
      categoryId: joi.string(),
    });
    const { error } = paramsSchema.validate({
      restaurantId,
      categoryId,
    });
    if (error) {
      return res.send({
        status: 400,
        message: error.details[0].message,
      });
    }
    const data = await deleteCategoryFromRestaurant(restaurantId, categoryId);
    if (data.status !== 200) {
      return res.send({
        status: data.status,
        message: data.message,
      });
    }
    return res.send({
      status: 200,
      response: true,
      message: 'Category deleted successfully!',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: 'Something went wrong!',
      error: error.message,
    });
  }
};
