import apiKey from "../../config/api-key.json";
import bookshelves from "../../config/bookshelves.json";

export const getApiKey = () => {
  return apiKey.apiKey;
};

export const getBookShelves = () => {
  return {
    userId: bookshelves.userId,
    shelfId: bookshelves.shelfId,
  };
};

export default {
  getApiKey,
  getBookShelves,
};
