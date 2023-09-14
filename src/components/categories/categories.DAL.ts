import writeData from '../../utils/writeData';
import { Category, Restaurant } from '../../types/dataTypes';
import readData from '../../utils/readData';

export const getCategoriesData = async (restaurantId: string) => {
  try {
    const jsonData = await readData();
    if (!jsonData) {
      return {
        status: 404,
        message: 'Data not found!',
      };
    }
    const data = JSON.parse(jsonData);
    const restaurant: Restaurant = data.restaurants.find(
      (r: Restaurant) => r.id === restaurantId
    );
    if (!restaurant) {
      return {
        status: 404,
        message: 'Restaurant not found!',
      };
    }
    return {
      status: 200,
      data: restaurant.categories,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Internal server error!',
    };
  }
};

export const addCategoryData = async (
  restaurantId: string,
  categoryData: Category
) => {
  try {
    const jsonData = await readData();
    if (!jsonData) {
      return {
        status: 404,
        message: 'Data not found!',
      };
    }
    const data = JSON.parse(jsonData);
    const restaurant: Restaurant = data.restaurants.find(
      (r: Restaurant) => r.id === restaurantId
    );
    if (!restaurant) {
      return {
        status: 404,
        message: 'Restaurant not found!',
      };
    }
    const category: Category = restaurant.categories.find(
      (c: Category) => c.categoryId === categoryData.categoryId
    );
    if (category) {
      return {
        status: 400,
        message: 'Category already exists!',
      };
    }
    restaurant.categories.push(categoryData);
    const status = await writeData(data);
    if (!status.response) {
      return {
        status: 500,
        message: 'File update went wrong!',
      };
    }
    return {
      status: 200,
      data: restaurant.categories,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Internal server error!',
    };
  }
};

export const updateCategoryData = async (
  restaurantId: string,
  categoryId: string,
  categoryName: string
) => {
  try {
    const jsonData = await readData();
    if (!jsonData) {
      return {
        status: 404,
        message: 'Data not found!',
      };
    }
    const data = JSON.parse(jsonData);
    const restaurant: Restaurant = data.restaurants.find(
      (r: Restaurant) => r.id === restaurantId
    );
    if (!restaurant) {
      return {
        status: 404,
        message: 'Restaurant not found!',
      };
    }
    const categoryIndex = restaurant.categories.findIndex(
      (c: Category) => c.categoryId === categoryId
    );
    if (categoryIndex === -1) {
      return {
        status: 404,
        message: 'Category not found!',
      };
    }
    restaurant.categories[categoryIndex].categoryName = categoryName;
    const status = await writeData(data);
    if (!status.response) {
      return {
        status: 500,
        message: 'File update went wrong!',
      };
    }
    return {
      status: 200,
      data: restaurant.categories,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Internal server error!',
    };
  }
};

export const deleteCategoryData = async (
  restaurantId: string,
  categoryId: string
) => {
  try {
    const jsonData = await readData();
    if (!jsonData) {
      return {
        status: 404,
        message: 'Data not found!',
      };
    }
    const data = JSON.parse(jsonData);
    const restaurant: Restaurant = data.restaurants.find(
      (r: Restaurant) => r.id === restaurantId
    );
    if (!restaurant) {
      return {
        status: 404,
        message: 'Restaurant not found!',
      };
    }
    const categoryIndex = restaurant.categories.findIndex(
      (c: Category) => c.categoryId === categoryId
    );
    if (categoryIndex === -1) {
      return {
        status: 404,
        message: 'Category not found!',
      };
    }
    restaurant.categories.splice(categoryIndex, 1);
    const status = await writeData(data);
    if (!status.response) {
      return {
        status: 500,
        message: 'File update went wrong!',
      };
    }
    return {
      status: 200,
      data: restaurant.categories,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Internal server error!',
    };
  }
};
