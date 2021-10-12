import { actionTypes } from "../constants";

const isSignup = (state = true, action) => {
  switch (action.type) {
    case actionTypes.IS_SIGN_UP:
      return action.payload;
    default:
      return state;
  }
};

export default isSignup;
