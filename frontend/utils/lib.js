import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const signUp = async (credentials) => {
  try {
    const response = await axios.post(
      `${apiEndpoint}/api/register`,
      credentials
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${apiEndpoint}/api/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getUser = async (username = null, email = null) => {
  try {
    const response = await axios.get(`${apiEndpoint}/api/user`, {
      params: { username, email },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateUser = async (username, data) => {
  try {
    const response = await axios.put(`${apiEndpoint}/api/user`, data, {
      params: { username },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const resetPassword = async (username, oldPassword, newPassword) => {
  try {
    const response = await axios.put(
      `${apiEndpoint}/api/user/reset-password`,
      { old_password: oldPassword, new_password: newPassword },
      {
        params: { username },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export const forgotPasswordReset = async (username, newPassword) => {
  try {
    const response = await axios.put(
      `${apiEndpoint}/api/user/forgot-password`,
      { new_password: newPassword },
      {
        params: { username },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const deleteUser = async (username) => {
  try {
    await axios.delete(`${apiEndpoint}/api/user`, {
      params: { username },
    });
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
