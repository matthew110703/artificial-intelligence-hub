import api from "../lib/api";

/**
 * Check username and email availability
 * @param {string} username
 * @param {string} email
 * @returns {Promise}
 */
export const checkAvailability = async (username, email) => {
  try {
    const res = await api.post("auth/check-availability", {
      username,
      email,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Send OTP to email
 * @param {string} email
 * @param {boolean} resend
 * @returns {Promise}
 */
export const sendOtp = async (email, resend = false) => {
  try {
    const res = await api.post(
      "/auth/send-otp",
      { email },
      {
        params: {
          resend,
        },
      },
    );
    throw res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * Sign up a new user
 * @param {Object} form
 * @returns {Promise}
 */
export const signUp = async (form) => {
  try {
    const res = await api.post("/auth/signup", form);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Sign in a user
 * @param {Object} form
 * @returns {Promise}
 */
export const signIn = async (form) => {
  try {
    const res = await api.post("/auth/signin", form);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Check if user is authenticated
 * @returns {Promise<Boolean>}
 */
export const checkUser = async () => {
  try {
    const res = await api.get("/user");
    return res.data?.success ?? false;
  } catch (error) {
    console.error(
      "Error checking user:",
      error?.response?.data || error.message,
    );

    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      return false;
    }

    return false;
  }
};
