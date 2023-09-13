import { getRestaurantsData } from './restaurant.DAL';

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
