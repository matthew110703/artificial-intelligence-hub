import api from "../lib/api";

export const getUser = async () => {
  try {
    const res = await api.get("/user");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (payload) => {
  try {
    const res = await api.put("/user", payload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
