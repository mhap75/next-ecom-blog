import http from "@/services/http";
import Router from "next/router";
import { useContext, createContext, useReducer, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useReducerAsync } from "use-reducer-async";

const AuthContext = createContext();
const AuthContextDispatcher = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case "LOGIN_PENDING":
			return { ...state, loading: true };
		case "LOGIN_SUCCESS":
			return { ...state, loading: false, user: action.payload };
		case "LOGIN_FAILED":
			return { ...state, loading: false, error: action.error };
		case "SIGNUP_PENDING":
			return { ...state, loading: true };
		case "SIGNUP_SUCCESS":
			return { ...state, loading: false, user: action.payload };
		case "SIGNUP_FAILED":
			return { ...state, loading: false, error: action.error };
		case "CLEAR_ERROR":
			return { ...state, error: null };
		default:
			return state;
	}
};

const asyncActionHandlers = {
	LOGIN:
		({ dispatch }) =>
		(action) => {
			dispatch({ type: "LOGIN_PENDING" });
			http
				.post("/user/signin", action.payload, {
					withCredentials: true,
				})
				.then(({ data }) => {
					dispatch({ type: "LOGIN_SUCCESS", payload: data });
					toast.success("Logged in successfully");
					setTimeout(() => {
						Router.push("/");
					}, 1500);
				})
				.catch((error) => {
					dispatch({
						type: "LOGIN_FAILED",
						error: error.response.data.message,
					});
					toast.error(error.response.data.message);
				});
		},
	SIGNUP:
		({ dispatch }) =>
		(action) => {
			dispatch({ type: "SIGNUP_PENDING" });
			http
				.post("/user/signup", action.payload, {
					withCredentials: true,
				})
				.then(({ data }) => {
					dispatch({ type: "SIGNUP_SUCCESS", payload: data });
					toast.success("Welcome to our website!");
					setTimeout(() => {
						Router.push("/");
					}, 1500);
				})
				.catch((error) => {
					dispatch({
						type: "SIGNUP_FAILED",
						error: error.response.data.message,
					});
					toast.error(error.response.data.message);
				});
		},
	PERSIST_USER:
		({ dispatch }) =>
		(action) => {
			http
				.get("/user/load", {
					withCredentials: true,
				})
				.then(({ data }) => {
					dispatch({
						type: "LOGIN_SUCCESS",
						payload: data,
					});
				})
				.catch((error) => {
					dispatch({ type: "LOGIN_FAILED" });
				});
		},
	LOGOUT:
		({ dispatch }) =>
		(action) => {
			http
				.get("/user/logout", {
					withCredentials: true,
				})
				.then(({ data }) => {})
				.catch((error) => {});
		},
};

const AuthProvider = ({ children }) => {
	const [user, dispatch] = useReducerAsync(
		reducer,
		{
			user: null,
			loading: false,
			error: null,
		},
		asyncActionHandlers
	);

	useEffect(() => {
		dispatch({ type: "PERSIST_USER" });
	}, []);

	return (
		<AuthContext.Provider value={user}>
			<AuthContextDispatcher.Provider value={dispatch}>
				{children}
			</AuthContextDispatcher.Provider>
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
export const useAuthActions = () => useContext(AuthContextDispatcher);
