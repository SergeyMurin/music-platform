export interface UserState {
  user: IUser | null;
  isAuth: boolean;
  token: string | null;
  subscriptions: ISubscription[] | null;
  subscribers: ISubscription[] | null;
  favorites: IFavorite[] | null;
}

export interface ISubscription {
  id: string;
}

export interface IFavorite {
  id: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  bio: string;
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

export const isUserTypeGuard = (value: any): value is IUser => {
  return (
    (value as IUser).id !== undefined &&
    (value as IUser).picture_url !== undefined &&
    (value as IUser).bio !== undefined &&
    (value as IUser).subscriptions_count !== undefined &&
    (value as IUser).email !== undefined &&
    (value as IUser).email_confirmed !== undefined &&
    (value as IUser).subscribers_count !== undefined &&
    (value as IUser).username !== undefined &&
    (value as IUser).favorites_count !== undefined &&
    (value as IUser).reposts_count !== undefined &&
    (value as IUser).tracks_count !== undefined &&
    (value as IUser).albums_count !== undefined &&
    (value as IUser).playlists_count !== undefined
  );
};

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
  payload: ISubscription[] | null;
}

interface IFetchFavorites {
  type: UserActionTypes.FETCH_FAVORITES;
  payload: IFavorite[] | null;
}

interface IFetchSubscribers {
  type: UserActionTypes.FETCH_SUBSCRIBERS;
  payload: ISubscription[] | null;
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
  | IFetchUserAction
  | IFetchUserErrorAction;
