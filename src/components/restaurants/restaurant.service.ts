import { Restaurant } from '../../types/dataTypes';
import {
  addRestaurantToData,
  deleteRestaurantFromData,
  getRestaurantsData,
  updateRestaurantData,
} from './restaurant.DAL';
import { v4 as uuidv4 } from 'uuid';

export const getRestaurantsList = async () => {
  try {
    const data = await getRestaurantsData();
    return data;
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
    };
  }
};

export const addRestaurantToList = async (restaurantData: Restaurant) => {
  try {
    const data = await addRestaurantToData({
      id: uuidv4(),
      categories: [],
      ...restaurantData,
    });
    return data;
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
    };
  }
};

export const updateRestaurantsInList = async (restaurantData: Restaurant) => {
  try {
    const data = await updateRestaurantData(restaurantData);
    return data;
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
    };
  }
};

export const deleteRestaurantFromList = async (restaurantId: string) => {
  try {
    const data = await deleteRestaurantFromData(restaurantId);
    return data;
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
    };
  }
};
