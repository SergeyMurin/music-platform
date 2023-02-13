import { Dispatch } from "react";
import { IUser, UserAction, UserActionTypes } from "../../types/user";
import axios from "axios";

export const setUser = (user: IUser | null) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionTypes.SET_USER, payload: user });
  };
};

export const setToken = (token: string | null) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionTypes.SET_TOKEN, payload: token });
  };
};

export const setAuth = (isAuth: boolean) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionTypes.SET_AUTH, payload: isAuth });
  };
};

export const fetchUser = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.get("http://localhost:5000/user", {
        params: { id },
      });
      dispatch({ type: UserActionTypes.SET_USER, payload: response.data });
      dispatch({ type: UserActionTypes.SET_AUTH, payload: true });
    } catch (e) {}
  };
};

export const fetchUserSubscriptions = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/subscribe/subscriptions",
        { params: { id } }
      );
      dispatch({
        type: UserActionTypes.FETCH_SUBSCRIPTIONS,
        payload: response.data,
      });
    } catch (e) {}
  };
};

export const fetchUserSubscribers = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/subscribe/subscribers",
        { params: { id } }
      );
      dispatch({
        type: UserActionTypes.FETCH_SUBSCRIBERS,
        payload: response.data,
      });
    } catch (e) {}
  };
};

export const fetchUserFavorites = (id: string, token: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.get("http://localhost:5000/favorite/all", {
        params: { id },
      });
      dispatch({
        type: UserActionTypes.FETCH_FAVORITES,
        payload: response.data,
      });
    } catch (e) {}
  };
};
