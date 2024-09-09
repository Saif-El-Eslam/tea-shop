import axios from "axios";

export const register = async (
  name: string,
  phone_number: string,
  password: string,
  verify_password: string,
  role?: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        name,
        phone_number,
        password,
        verify_password,
        role,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const login = async (phone_number: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        phone_number,
        password,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
