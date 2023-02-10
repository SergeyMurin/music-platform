export interface UserState {
  token: string;
  isAuth: boolean;
  username: string;
  email: string;
  email_confirmed: boolean;
  google_auth: boolean;
  picture_url: string;
  bio: string;
  subscribers_count: number;
  subscriptions_count: number;
  favorites_count: number;
  reposts_count: number;
  tracks_count: number;
  albums_count: number;
  playlists_count: number;
}

export enum UserActionType {
  SET_TOKEN = "SET_TOKEN",
  SET_AUTH = "SET_AUTH",
  FETCH_USER = "FETCH_USER",
  FETCH_USER_ERROR = "FETCH_USER_ERROR",
}
