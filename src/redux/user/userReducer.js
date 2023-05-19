import {
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	SIGNUP_USER_REQUEST,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_FAILURE,
} from "./userTypes";

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case LOGIN_USER_REQUEST:
			return {
				loading: true,
			};
		case LOGIN_USER_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			};
		case LOGIN_USER_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const userSignupReducer = (state = {}, action) => {
	switch (action.type) {
		case SIGNUP_USER_REQUEST:
			return {
				loading: true,
			};
		case SIGNUP_USER_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			};
		case SIGNUP_USER_FAILURE:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};