import {
  CLEAR_ERRORS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
} from "../constants/adminActionsTypes";
import axios from "axios";
import { BASE_URL } from "../api";

// admin -> get all users req action
export const getAllUsers = () => async (dispatch, getState) => {
  const user = getState().auth.userInfo;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(
      `${BASE_URL}/users/admin/allusers`,
      config
    );

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//  get single user details req action
export const getUserDetails = (id) => async (dispatch, getState) => {
  const user = getState().auth.userInfo;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${BASE_URL}/users/admin/singleuser/${id}`,
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   admin -> update user role (put)
export const updateUser = (id, userData) => async (dispatch, getState) => {
  const user = getState().auth.userInfo;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });

    const { data } = await axios.put(
      `${BASE_URL}/users/admin/singleuser/${id}`,
      userData,
      config
    );
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   delete a user req action
export const deleteUser = (id) => async (dispatch, getState) => {
  const user = getState().auth.userInfo;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });

    const { data } = await axios.delete(
      `${BASE_URL}/users/admin/singleuser/${id}`,
      config
    );

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// products -
// admin -> get all products
export const getAdminProducts = () => async (dispatch, getState) => {
  const user = getState().auth.userInfo;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/admin/products`, config);
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   admin -> create a new product
export const newProduct = (productData) => async (dispatch, getState) => {
  const user = getState().auth.userInfo;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST,
    });

    const { data } = await axios.post(
      `${BASE_URL}/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   admin -> update created product action
export const updateProduct =
  (id, productData) => async (dispatch, getState) => {
    const user = getState().auth.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      dispatch({
        type: UPDATE_PRODUCT_REQUEST,
      });
      const { data } = await axios.put(
        `${BASE_URL}/admin/product/${id}`,
        productData,
        config
      );

      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// admin->  delete a product
export const deleteProduct = (id) => async (dispatch, getState) => {
  const user = getState().auth.userInfo;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(
      `${BASE_URL}/admin/product/${id}`,
      config
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//  admin -> delete a review
export const deleteReview =
  (reviewId, productId) => async (dispatch, getState) => {
    const user = getState().auth.userInfo;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      dispatch({
        type: DELETE_REVIEW_REQUEST,
      });

      const { data } = await axios.delete(
        `${BASE_URL}/reviews?id=${reviewId}&productId=${productId}`,
        config
      );

      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get all orders --admin
export const allOrders = () => async (dispatch, getState) => {
  const user = getState().auth.userInfo;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/admin/orders`, config);
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// admin -> Update order (put)
export const updateOrder = (id, order) => async (dispatch, getState) => {
  const user = getState().auth.userInfo;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const { data } = await axios.put(
      `${BASE_URL}/admin/order/${id}`,
      order,
      config
    );
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// admin -> Delete order
export const deleteOrder = (id) => async (dispatch, getState) => {
  const user = getState().auth.userInfo;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(
      `${BASE_URL}/admin/order/${id}`,
      config
    );

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
