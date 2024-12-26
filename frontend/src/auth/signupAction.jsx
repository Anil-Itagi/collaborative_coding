// actions.js
import { SIGNUP_SUCCESS, SIGNUP_ERROR ,LOGOUT,LOGIN_SUCCESS,LOADER,UNLOADER} from "./actionTypes";

export const signupSuccess = (formData) => ({
  type: SIGNUP_SUCCESS,
  payload: formData,
});

export const signupError = (error) => ({
  type: SIGNUP_ERROR,
  payload: error,
});
export const loginSuccess = (formData) => ({
    type: LOGIN_SUCCESS,
    payload:formData
});
export const logout = () => ({
  type: LOGOUT,
});
export const loader = () => ({
  type: LOADER,
});
export const unLoader = () => ({
  type: UNLOADER,

})