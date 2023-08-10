import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== "production") {
		return composeWithDevTools(applyMiddleware(...middleware));
	}

	return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state,
			...action.payload,
		};
		return nextState;
	} else {
		return rootReducer(state, action);
	}
};

const initStore = () => {
	return createStore(reducer, bindMiddleware([thunk]));
};

export const wrapper = createWrapper(initStore);
