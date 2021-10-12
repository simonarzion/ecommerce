import { actionTypes } from "../constants";

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const auth = (data) => {
  return {
    type: actionTypes.AUTH,
    payload: data,
  };
};

export const switchSignUp = (data) => {
  return {
    type: actionTypes.IS_SIGN_UP,
    payload: data,
  };
};
