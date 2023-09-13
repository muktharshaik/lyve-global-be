import readData from '../../utils/readData';

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
