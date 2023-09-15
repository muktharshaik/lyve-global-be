import { Request, Response } from 'express';
import {
  getItemsList,
  updateItemsLits,
  addItemToCategory,
  deleteItemFromCategory,
} from './items.service';
import joi from 'joi';

export const getItems = async (req: Request, res: Response) => {
  try {
    const { restaurantId, categoryId } = req.params;
    const paramsSchema = joi.object({
      restaurantId: joi.string(),
      categoryId: joi.string(),
    });
    const { error } = paramsSchema.validate({ restaurantId, categoryId });
    if (error) {
      return res.send({
        status: 400,
        message: error.details[0].message,
      });
    }
    const data = await getItemsList(restaurantId, categoryId);
    if (data.status !== 200) {
      return res.send({
        status: data.status,
        message: data.message,
      });
    }
    return res.send({
      status: 200,
      response: true,
      data,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: 'Something went wrong!',
    });
  }
};

export const updateItems = async (req: Request, res: Response) => {
  try {
    const { restaurantId, categoryId, itemId, itemData } = req.body;
    const itemDataSchema = joi.object({
      restaurantId: joi.string(),
      categoryId: joi.string(),
      itemId: joi.string(),
      itemData: joi.object({
        itemId: joi.string(),
        name: joi.string(),
        description: joi.string(),
        price: joi.number(),
        image: joi.string(),
        customizations: joi
          .array()
          .optional()
          .items(
            joi.object({
              primaryText: joi.string(),
              secondaryText: joi.string(),
              isRequired: joi.boolean(),
              image: joi.string().optional(),
              variants: joi.array().items(
                joi.object({
                  name: joi.string(),
                  price: joi.number().valid(null),
                  image: joi.string().optional(),
                })
              ),
            })
          ),
      }),
    });
    const { error } = itemDataSchema.validate({
      restaurantId,
      categoryId,
      itemId,
      itemData,
    });
    if (error) {
      return res.send({
        status: 400,
        message: error.details[0].message,
      });
    }
    const data = await updateItemsLits(
      restaurantId,
      categoryId,
      itemId,
      itemData
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
      message: 'Item updated successfully!',
    });
  } catch (error) {
    res.send({
      status: 500,
      message: 'Something went wrong!',
    });
  }
};

export const addItem = async (req: Request, res: Response) => {
  try {
    const { restaurantId, categoryId, itemData } = req.body;
    const itemDataSchema = joi.object({
      restaurantId: joi.string(),
      categoryId: joi.string(),
      itemData: joi.object({
        name: joi.string(),
        description: joi.string(),
        price: joi.number(),
        image: joi.string(),
        customizations: joi
          .array()
          .optional()
          .items(
            joi.object({
              primaryText: joi.string(),
              secondaryText: joi.string(),
              isRequired: joi.boolean(),
              image: joi.string().optional(),
              variants: joi.array().items(
                joi.object({
                  name: joi.string(),
                  price: joi.number().valid(null),
                  image: joi.string().optional(),
                })
              ),
            })
          ),
      }),
    });
    const { error } = itemDataSchema.validate({
      restaurantId,
      categoryId,
      itemData,
    });
    if (error) {
      return res.send({
        status: 400,
        message: error.details[0].message,
      });
    }
    const data = await addItemToCategory(restaurantId, categoryId, itemData);
    if (data.status !== 200) {
      return res.send({
        status: data.status,
        message: data.message,
      });
    }
    return res.send({
      status: 200,
      response: true,
      message: 'Item updated successfully!',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: 'Something went wrong!',
      error: error.message,
    });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { restaurantId, categoryId, itemId } = req.params;
    const paramsSchema = joi.object({
      restaurantId: joi.string(),
      categoryId: joi.string(),
      itemId: joi.string(),
    });
    const { error } = paramsSchema.validate({
      restaurantId,
      categoryId,
      itemId,
    });
    if (error) {
      return res.send({
        status: 400,
        message: error.details[0].message,
      });
    }
    const data = await deleteItemFromCategory(restaurantId, categoryId, itemId);
    if (data.status !== 200) {
      return res.send({
        status: data.status,
        message: data.message,
      });
    }
    return res.send({
      status: 200,
      response: true,
      data,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: 'Something went wrong!',
    });
  }
};
