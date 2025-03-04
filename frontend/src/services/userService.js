import api from "../lib/api";

/** Get User profile */
export const getUser = async () => {
  try {
    const res = await api.get("/user");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** Update User profile */
export const updateUser = async (payload) => {
  try {
    const res = await api.put("/user", payload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
