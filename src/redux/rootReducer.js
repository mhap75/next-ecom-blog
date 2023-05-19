import { combineReducers } from "redux";
import { userLoginReducer, userSignupReducer } from "./user/userReducer";

const rootReducer = combineReducers({
	userLogin: userLoginReducer,
	userSignup: userSignupReducer,
});

export default rootReducer;
