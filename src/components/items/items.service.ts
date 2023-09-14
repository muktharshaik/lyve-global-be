import {
  createItemData,
  deleteItemData,
  getItemsData,
  updateItemData,
} from './items.DAL';
import { Item } from '../../types/dataTypes';
import { v4 as uuidv4 } from 'uuid';

export const getItemsList = async (
  restaurantId: string,
  categoryId: string
) => {
  try {
    const data = await getItemsData(restaurantId, categoryId);
    return data;
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
    };
  }
};

export const updateItemsLits = async (
  restaurantId: string,
  categoryId: string,
  itemId: string,
  itemData: Item
) => {
  try {
    const data = await updateItemData(
      restaurantId,
      categoryId,
      itemId,
      itemData
    );
    return data;
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
    };
  }
};

export const addItemToCategory = async (
  restaurantId: string,
  categoryId: string,
  itemData: Item
) => {
  try {
    const data = await createItemData(restaurantId, categoryId, {
      itemId: uuidv4(),
      ...itemData,
    });
    return data;
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
    };
  }
};

export const deleteItemFromCategory = async (
  restaurantId: string,
  categoryId: string,
  itemId: string
) => {
  try {
    const data = await deleteItemData(restaurantId, categoryId, itemId);
    return data;
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
    };
  }
};
