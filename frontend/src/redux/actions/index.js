import axios from "axios";
import { actionTypes } from "../constants";

const API = axios.create({ baseURL: "http://localhost:3001" });

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const signIn = (formData, router) => (dispatch) => {
  // const { data } = axios.post(`${url}/user/signin`, formData);
  // dispatch({ type: actionTypes.AUTH, payload: data });
  // router.push("/");
};

export const signUp = (form, router) => (dispatch) => {
  API.post("/user/signup", form)
    .then((data) => dispatch({ type: actionTypes.AUTH, data: data.data }))
    .then((res) => console.log(res.data));

  router.push("/");
};

export const switchSignUp = (data) => {
  return {
    type: actionTypes.IS_SIGN_UP,
    payload: data,
  };
};
