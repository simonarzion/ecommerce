import { actionTypes } from "../constants";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT:
      localStorage.clear();

      return { ...state, data: null };

    case actionTypes.AUTH:
      console.log(action);
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default authReducer;
