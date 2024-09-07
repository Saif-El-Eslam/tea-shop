import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export const register = async (
  name: string,
  phone_number: string,
  password: string,
  verify_password: string,
  role?: string
) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      phone_number,
      password,
      verify_password,
      role,
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const login = async (phone_number: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      phone_number,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.error("ERROR", error);

    throw error.response?.data;
  }
};

export const logout = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
