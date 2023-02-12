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
      console.log(response);
      dispatch({ type: UserActionTypes.SET_USER, payload: response.data });
      dispatch({ type: UserActionTypes.SET_AUTH, payload: true });
    } catch (e) {}
  };
};
