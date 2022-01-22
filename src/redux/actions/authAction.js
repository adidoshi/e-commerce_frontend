import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  // LOGOUT_SUCCESS,
} from "../constants/authActionsTypes";
import axios from "axios";
import { BASE_URL } from "../api";

//  user login req action (post)
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `${BASE_URL}/users/login`,
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//  user register req action (post)
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/users/register`,
      { name, email, password },
      config
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// //  user logout
// export const logout = () => async (dispatch) => {
//   dispatch({
//     type: LOGOUT_SUCCESS,
//   });
//   localStorage.removeItem("userInfo");
// };

//  user forgotPass req action (post)
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/users/password/forgot`,
      { email },
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response,
    });
  }
};

//  user resetPass req action (put)
export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `${BASE_URL}/users/password/reset/${token}`,
        { password, confirmPassword },
        config
      );

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
