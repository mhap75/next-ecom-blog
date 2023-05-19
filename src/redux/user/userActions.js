import { toast } from "react-hot-toast";
import {
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	SIGNUP_USER_REQUEST,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_FAILURE,
} from "./userTypes";
import http from "@/services/http";

export const loginUsersRequest = () => {
	return {
		type: LOGIN_USER_REQUEST,
	};
};

export const loginUsersSuccess = (users) => {
	return {
		type: LOGIN_USER_SUCCESS,
		payload: users,
	};
};

export const loginUsersFailure = (error) => {
	return {
		type: LOGIN_USER_FAILURE,
		payload: error,
	};
};

export const signupUsersRequest = () => {
	return {
		type: SIGNUP_USER_REQUEST,
	};
};

export const signupUsersSuccess = (users) => {
	return {
		type: SIGNUP_USER_SUCCESS,
		payload: users,
	};
};

export const signupUsersFailure = (error) => {
	return {
		type: SIGNUP_USER_FAILURE,
		payload: error,
	};
};

export const loginUsers = (data) => {
	return (dispatch) => {
		dispatch(loginUsersRequest());
		http.get("/user/signin", data)
			.then(({ data }) => {
				dispatch(loginUsersSuccess(data));
				toast.success("Logged in successfully");
			})
			.catch((error) => {
				dispatch(loginUsersFailure(error.response.data.message));
				toast.error(error.response.data.message);
			});
	};
};

export const signupUsers = (data) => {
	return (dispatch) => {
		dispatch(signupUsersRequest());
		http.get("/user/signup", data)
			.then(({ data }) => {
				dispatch(signupUsersSuccess(data));
				toast.success("Signed up successfully");
			})
			.catch((error) => {
				dispatch(signupUsersFailure(error.response.data.message));
				toast.error(error.response.data.message);
			});
	};
};
