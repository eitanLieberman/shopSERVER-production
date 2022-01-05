import axios from "axios";

const BASE_URL = "https://mern-shop-eitan.herokuapp.com/api/";

// const Token =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     ?.accessToken || null;
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const Token = currentUser?.accessToken;

export const publicRequest = axios.create({ baseURL: BASE_URL });

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${Token}` },
});
