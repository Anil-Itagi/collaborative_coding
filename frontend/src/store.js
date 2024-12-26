import { createStore, combineReducers } from "redux";
import { signupReducer } from "./auth/signupReducer";

const rootReducer = combineReducers({
    signup: signupReducer,
});

// Add Redux DevTools support
export const store = createStore(rootReducer);