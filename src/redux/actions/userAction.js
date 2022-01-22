import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from "../constants/userActionsTypes";
import axios from "axios";
import { BASE_URL } from "../api";

// get user profile details
export const loadUser = () => async (dispatch, getState) => {
  const user = getState().auth?.userInfo;
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const { data } = await axios.get(`${BASE_URL}/users/me`, config);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update user profile
export const updateProfile = (userData) => async (dispatch, getState) => {
  const user = getState().auth.userInfo;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const { data } = await axios.put(
      `${BASE_URL}/users/profile/update`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//  update user password from account page
export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch, getState) => {
    const user = getState().auth.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      dispatch({
        type: UPDATE_PASSWORD_REQUEST,
      });

      const { data } = await axios.put(
        `${BASE_URL}/users/password/update`,
        { oldPassword, newPassword, confirmPassword },
        config
      );

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
