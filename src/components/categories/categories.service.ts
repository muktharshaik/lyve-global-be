import {
  addCategoryData,
  deleteCategoryData,
  getCategoriesData,
  updateCategoryData,
} from './categories.DAL';
import { v4 as uuidv4 } from 'uuid';

export const getCategoryList = async (restaurantId: string) => {
  try {
    const data = await getCategoriesData(restaurantId);
    return data;
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
    };
  }
};

export const updateCategoryList = async (
  restaurantId: string,
  categoryId: string,
  categoryName: string
) => {
  try {
    const data = await updateCategoryData(
      restaurantId,
      categoryId,
      categoryName
    );
    return data;
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
    };
  }
};

export const addCategoryToRestaurant = async (
  restaurantId: string,
  categoryName: string
) => {
  try {
    const data = await addCategoryData(restaurantId, {
      categoryId: uuidv4(),
      categoryName,
      items: [],
    });
    return data;
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
    };
  }
};

export const deleteCategoryFromRestaurant = async (
  restaurantId: string,
  categoryId: string
) => {
  try {
    const data = await deleteCategoryData(restaurantId, categoryId);
    return data;
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
    };
  }
};
