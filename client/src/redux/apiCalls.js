import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";

export const register = async (dispatch, user) => {
  const res = await publicRequest.post("/auth/register", user);
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logoutUser = async (dispatch, user) => {
  dispatch(logout());
};

export const getUsers = async (dispatch) => {
  try {
    const res = await userRequest.get("/users");
    alert("open your log to see the list");
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = async (dispatch, product) => {
  try {
    const res = await userRequest.post("/products", product);
  } catch (err) {
    console.log(err);
  }
};
export const makeOrder = async (dispatch, order) => {
  const res = await userRequest.post("/orders", order);
};

export const getOrders = async (dispatch) => {
  try {
    const res = await userRequest.get("/orders");
    alert("open your log to see the list");
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
