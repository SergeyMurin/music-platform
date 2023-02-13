export interface UserState {
  user: IUser | null;
  isAuth: boolean;
  token: string | null;
  subscriptions: string[] | null;
  subscribers: string[] | null;
  favorites: any[] | null;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  email_confirmed: string;
  picture_url: string;
  subscribers_count: number;
  subscriptions_count: number;
  favorites_count: number;
  reposts_count: number;
  tracks_count: number;
  albums_count: number;
  playlists_count: number;
}

export enum UserActionTypes {
  SET_USER = "SET_USER",
  SET_TOKEN = "SET_TOKEN",
  SET_AUTH = "SET_AUTH",
  FETCH_USER = "FETCH_USER",
  FETCH_FAVORITES = "FETCH_FAVORITES",
  FETCH_SUBSCRIPTIONS = "FETCH_SUBSCRIPTIONS",
  FETCH_SUBSCRIBERS = "FETCH_SUBSCRIBERS",
  FETCH_USER_ERROR = "FETCH_USER_ERROR",
}

interface ISetUserAction {
  type: UserActionTypes.SET_USER;
  payload: IUser | null;
}

interface ISetTokenAction {
  type: UserActionTypes.SET_TOKEN;
  payload: string | null;
}

interface ISetAuthAction {
  type: UserActionTypes.SET_AUTH;
  payload: boolean;
}

interface IFetchUserAction {
  type: UserActionTypes.FETCH_USER;
  payload: IUser;
}

interface IFetchSubscriptions {
  type: UserActionTypes.FETCH_SUBSCRIPTIONS;
  payload: string[] | null;
}

interface IFetchFavorites {
  type: UserActionTypes.FETCH_FAVORITES;
  payload: any[] | null;
}

interface IFetchSubscribers {
  type: UserActionTypes.FETCH_SUBSCRIBERS;
  payload: any[] | null;
}

interface IFetchUserErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR;
  payload: string;
}

export type UserAction =
  | ISetUserAction
  | ISetTokenAction
  | ISetAuthAction
  | IFetchSubscriptions
  | IFetchFavorites
  | IFetchSubscribers
  | IFetchUserAction;
