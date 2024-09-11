import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { TeaType } from "app/types/types";

export const getTeas = async () => {
  try {
    const token = JSON.parse((await AsyncStorage.getItem("token")) || "");

    const response = await axios.get(`${API_URL}/teas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createTea = async (data: TeaType) => {
  try {
    const token = JSON.parse((await AsyncStorage.getItem("token")) || "");

    const response = await axios.post(`${API_URL}/teas`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateTea = async (id: string, data: TeaType) => {
  try {
    const token = JSON.parse((await AsyncStorage.getItem("token")) || "");

    const response = await axios.put(`${API_URL}/teas/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteTea = async (id: string) => {
  try {
    const token = JSON.parse((await AsyncStorage.getItem("token")) || "");

    const response = await axios.delete(`${API_URL}/teas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
