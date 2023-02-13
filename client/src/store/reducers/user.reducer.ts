import { UserAction, UserActionTypes, UserState } from "../../types/user";

const initialState: UserState = {
  user: null,
  favorites: null,
  subscriptions: null,
  subscribers: null,
  isAuth: false,
  token: null,
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case UserActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    case UserActionTypes.SET_AUTH:
      return { ...state, isAuth: action.payload };
    case UserActionTypes.FETCH_SUBSCRIPTIONS:
      return { ...state, subscriptions: action.payload };
    case UserActionTypes.FETCH_SUBSCRIBERS:
      return { ...state, subscribers: action.payload };
    case UserActionTypes.FETCH_FAVORITES:
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};
