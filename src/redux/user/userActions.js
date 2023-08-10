import { toast } from "react-hot-toast";
import {
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	SIGNUP_USER_REQUEST,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_FAILURE,
	LOGOUT_USER_REQUEST,
	CLEAR_FORM_ERROR,
	PERSIST_USER,
} from "./userTypes";
import http from "@/services/http";
import Router from "next/router";

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
		http.post("/user/signin", data)
			.then(({ data }) => {
				dispatch(loginUsersSuccess(data));
				toast.success("Logged in successfully");
				setTimeout(() => {
					Router.push("/");
				}, 1500);
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
		http.post("/user/signup", data)
			.then(({ data }) => {
				dispatch(loginUsersSuccess(data));
				dispatch(signupUsersSuccess(data));
				toast.success("Signed up successfully");
				setTimeout(() => {
					Router.push("/");
				}, 1500);
			})
			.catch((error) => {
				dispatch(signupUsersFailure(error.response.data.message));
				toast.error(error.response.data.message);
			});
	};
};

export const signout = () => (dispatch) => {
	dispatch({ type: LOGOUT_USER_REQUEST });
	http.get("/user/logout")
		.then(({ data }) => {})
		.catch((error) => {});
};

export const clearFormError = () => (dispatch) => {
	dispatch({ type: CLEAR_FORM_ERROR });
	toast.remove();
};

export const persistUser = (store)  => {
	http.get("/user/load")
		.then(({ data }) => {
			store.dispatch(loginUsersSuccess(data));
			store.dispatch(signupUsersSuccess(data));
		})
		.catch((error) => {});
};
