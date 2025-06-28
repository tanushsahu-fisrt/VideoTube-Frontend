import axios from "axios";

export const apiCall = async (endpoint, method = 'GET', payload= {}) => {
  try {
    const response = await axios({
      url: endpoint,
      method: method,
      data : payload,
    });

    return response.data;
  } catch (err) {
    console.error("API Error:", err.response?.data || err.message);
    throw err;
  }
};
