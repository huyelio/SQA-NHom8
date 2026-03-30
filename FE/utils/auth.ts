import AsyncStorage from "@react-native-async-storage/async-storage"
import { STORAGE_KEY } from "../constants/common"

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    return token;
  } catch (error) {
    console.error("Error reading token:", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
  } catch (error) {
    console.error("Error removing token:", error);
  }
};