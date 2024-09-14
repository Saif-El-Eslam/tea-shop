import apiClient from "./ApiClient";

export const register = async (
  name: string,
  phone_number: string,
  password: string,
  verify_password: string,
  role?: string
) => {
  try {
    const response = await apiClient.post("/auth/register", {
      name,
      phone_number,
      password,
      verify_password,
      role,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const login = async (phone_number: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", {
      phone_number,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
