import { SIGNUP_SUCCESS, SIGNUP_ERROR, LOGOUT, LOGIN_SUCCESS, LOADER, UNLOADER } from "./actionTypes";

const initialState = {
    user: null, 
    error: null,
    isAuthenticated: false,
    isLoading:false,
};

export const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return { ...state, user: action.payload, error: null};
        case SIGNUP_ERROR:
            return { ...state, error: action.payload };
        case LOGIN_SUCCESS:
            return { ...state, user: action.payload, isAuthenticated:true, error: null };
        case LOGOUT:
            return { ...state, user: null, isAuthenticated:false };
        case LOADER:
            return { ...state, isLoading:true };
        case UNLOADER:
            return { ...state, isLoading:false};
        default:
            return state;
    }
};
