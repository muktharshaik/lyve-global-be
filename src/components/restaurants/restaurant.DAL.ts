import writeData from '../../utils/writeData';
import readData from '../../utils/readData';
import { Restaurant } from '../../types/dataTypes';

export const getRestaurantsData = async () => {
  try {
    const jsonData = await readData();
    if (!jsonData) {
      return {
        status: 404,
        message: 'Data not found!',
      };
    }
    return {
      status: 200,
      data: JSON.parse(jsonData),
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
      error,
    };
  }
};

export const addRestaurantToData = async (restaurantsData: Restaurant) => {
  try {
    const jsonData = await readData();
    if (!jsonData) {
      return {
        status: 404,
        message: 'Data not found!',
      };
    }
    const data = JSON.parse(jsonData);
    data.restaurants.push(restaurantsData);
    const status = await writeData(data);
    if (!status.response) {
      return {
        status: 500,
        message: 'File update went wrong!',
      };
    }
    return {
      status: 200,
      message: 'Restaurant added successfully!',
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
      error,
    };
  }
};

export const updateRestaurantData = async (restaurantData: Restaurant) => {
  try {
    const jsonData = await readData();
    if (!jsonData) {
      return {
        status: 404,
        message: 'Data not found!',
      };
    }
    const data = JSON.parse(jsonData);
    const restaurantIndex = data.restaurants.findIndex(
      (r: Restaurant) => r.id === restaurantData.id
    );
    if (restaurantIndex === -1) {
      return {
        status: 404,
        message: 'Restaurant not found!',
      };
    }
    data.restaurants[restaurantIndex].name = restaurantData.name;
    data.restaurants[restaurantIndex].image = restaurantData.image;
    data.restaurants[restaurantIndex].deliveryTime =
      restaurantData.deliveryTime;
    data.restaurants[restaurantIndex].rating = restaurantData.rating;
    data.restaurants[restaurantIndex].costRange = restaurantData.costRange;
    const status = await writeData(data);
    if (!status.response) {
      return {
        status: 500,
        message: 'File update went wrong!',
      };
    }
    return {
      status: 200,
      data: restaurantData,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
      error,
    };
  }
};

export const deleteRestaurantFromData = async (restaurantId: string) => {
  try {
    const jsonData = await readData();
    if (!jsonData) {
      return {
        status: 404,
        message: 'Data not found!',
      };
    }
    const data = JSON.parse(jsonData);
    const restaurantIndex = data.restaurants.findIndex(
      (r: Restaurant) => r.id === restaurantId
    );
    if (restaurantIndex === -1) {
      return {
        status: 404,
        message: 'Restaurant not found!',
      };
    }
    data.restaurants.splice(restaurantIndex, 1);
    const status = await writeData(data);
    if (!status.response) {
      return {
        status: 500,
        message: 'File update went wrong!',
      };
    }
    return {
      status: 200,
      data: data.restaurants,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong!',
      error,
    };
  }
};
