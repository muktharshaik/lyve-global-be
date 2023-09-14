import { Category, Item, Restaurant } from '../../types/dataTypes';
import readData from '../../utils/readData';
import writeData from '../../utils/writeData';

export const getItemsData = async (
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
    const category: Category = restaurant.categories.find(
      (c: Category) => c.categoryId === categoryId
    );
    if (!category) {
      return {
        status: 404,
        message: 'Category not found!',
      };
    }
    return {
      status: 200,
      data: category.items,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Internal server error!',
    };
  }
};

export const updateItemData = async (
  restaurantId: string,
  categoryId: string,
  itemId: string,
  itemData: Item
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
      (c: Category) => c.categoryId === categoryId
    );
    if (!category) {
      return {
        status: 404,
        message: 'Category not found!',
      };
    }
    const itemIndex = category.items.findIndex(
      (i: Item) => i.itemId === itemId
    );
    if (itemIndex === -1) {
      return {
        status: 404,
        message: 'Item not found!',
      };
    }
    category.items[itemIndex] = itemData;
    const status = await writeData(data);
    if (!status.response) {
      return {
        status: 500,
        message: 'File update went wrong!',
      };
    }
    return {
      status: 200,
      message: 'Item updated successfully!',
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Internal server error!',
    };
  }
};

export const createItemData = async (
  restaurantId: string,
  categoryId: string,
  itemData: Item
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
      (c: Category) => c.categoryId === categoryId
    );
    if (!category) {
      return {
        status: 404,
        message: 'Category not found!',
      };
    }
    const itemIndex = category.items.findIndex(
      (i: Item) => i.itemId === itemData.itemId
    );
    if (itemIndex !== -1) {
      return {
        status: 400,
        message: 'Item already exists!',
      };
    }
    category.items.push(itemData);
    const status = await writeData(data);
    if (!status.response) {
      return {
        status: 500,
        message: 'File update went wrong!',
      };
    }
    return {
      status: 200,
      message: 'Item created successfully!',
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Internal server error!',
    };
  }
};

export const deleteItemData = async (
  restaurantId: string,
  categoryId: string,
  itemId: string
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
      (c: Category) => c.categoryId === categoryId
    );
    if (!category) {
      return {
        status: 404,
        message: 'Category not found!',
      };
    }
    const itemIndex = category.items.findIndex(
      (i: Item) => i.itemId === itemId
    );
    if (itemIndex === -1) {
      return {
        status: 404,
        message: 'Item not found!',
      };
    }
    category.items.splice(itemIndex, 1);
    const status = await writeData(data);
    if (!status.response) {
      return {
        status: 500,
        message: 'File update went wrong!',
      };
    }
    return {
      status: 200,
      message: 'Item deleted successfully!',
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Internal server error!',
    };
  }
};
