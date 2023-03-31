import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (err) {
    console.log("AsyncStorage", err);
    return null;
  }
};

export const setStorageData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log("AsyncStorage", err);
  }
};

export const deleteStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log("AsyncStorage", err);
  }
};

export default {
  getStorageData,
  setStorageData,
  deleteStorage,
};
