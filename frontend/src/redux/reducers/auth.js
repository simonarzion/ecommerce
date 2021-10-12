import { actionTypes } from "../constants";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT:
      localStorage.clear();

      return { ...state, data: null };
    case actionTypes.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default authReducer;
