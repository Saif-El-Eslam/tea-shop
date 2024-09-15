import apiClient from "./ApiClient";
import { TeaType } from "app/types/types";

export const getTeas = async () => {
  try {
    const response = await apiClient.get("/teas");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createTea = async (data: TeaType) => {
  try {
    const response = await apiClient.post("/teas", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateTea = async (id: string, data: TeaType) => {
  try {
    const response = await apiClient.put(`/teas/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteTea = async (id: string) => {
  try {
    const response = await apiClient.delete(`/teas/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
