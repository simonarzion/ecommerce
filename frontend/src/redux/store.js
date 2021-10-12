import { combineReducers } from "redux";
import auth from "../redux/reducers/auth";
import isSignup from "./reducers/isSignup";

export const allReducers = combineReducers({ auth, isSignup });
