import axios from "axios";
import { actionTypes } from "../constants";
const url = "http://localhost:3001";

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const signIn = (formData, router) => (dispatch) => {
  const { data } = axios.post(`${url}/user/signin`, formData);

  dispatch({ type: actionTypes.AUTH, payload: data });
  router.push("/");
};

export const signUp = (formData, router) => async (dispatch) => {
  const data = await fetch(`${url}/user/signup`, {
    method: "POST",
    body: JSON.stringify({ formData }),
  });
  const res = await data.json();
  console.log(res);

  // dispatch({ type: actionTypes.AUTH, payload: data });
  router.push("/");
};

export const switchSignUp = (data) => {
  return {
    type: actionTypes.IS_SIGN_UP,
    payload: data,
  };
};
