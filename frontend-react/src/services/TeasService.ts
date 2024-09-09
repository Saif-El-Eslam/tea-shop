import axios from "axios";
import { TeaType } from "../Types/types";

export const getTeas = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/teas`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createTea = async (data: TeaType) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/teas`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateTea = async (id: string, data: TeaType) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/teas/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteTea = async (id: string) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/teas/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
