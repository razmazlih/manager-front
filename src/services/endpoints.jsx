const API_BASE_URL = process.env.REACT_APP_API_URL;

const endpoints = {
  login: `${API_BASE_URL}/auth/login`,
  users: `${API_BASE_URL}/users`,
  restaurants: `${API_BASE_URL}/restaurants`,
  orders: `${API_BASE_URL}/orders`,
};

export default endpoints;