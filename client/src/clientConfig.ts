interface IClientConfig {
  client_uri: string;
  server_uri: string;
  google_client_id: string;
  local: {
    id: string;
    token: string;
  };
  client_routes: {
    layout: string;
    not_found: string;
    auth: {
      sign_in: string;
      sign_up: string;
      email: string;
      email_confirm: string;
      password_forgot: string;
      password_reset: string;
    };
    admin: string;
    album: {
      index: string;
      param: string;
    };
    playlist: {
      index: string;
      param: string;
    };
    track: {
      index: string;
      param: string;
    };
    profile: {
      index: string;
      param: string;
      favorites: string;
      tracks: string;
      subscribers: string;
      subscriptions: string;
    };
    search: string;
    upload: {
      index: string;
      track: string;
      album: string;
    };
  };
}

const {
  REACT_APP_GOOGLE_CLIENT_ID,
  REACT_APP_SERVER_URI,
  REACT_APP_CLIENT_URI,
  REACT_APP_LOCAL_ID,
  REACT_APP_LOCAL_TOKEN,
  REACT_APP_ROUTE_LAYOUT,
  REACT_APP_ROUTE_NOT_FOUND,
  REACT_APP_ROUTE_ADMIN,
  REACT_APP_ROUTE_ALBUM,
  REACT_APP_ROUTE_ALBUM_PARAM_ID,
  REACT_APP_ROUTE_EMAIL,
  REACT_APP_ROUTE_EMAIL_CONFIRM,
  REACT_APP_ROUTE_PASSWORD_FORGOT,
  REACT_APP_ROUTE_PASSWORD_RESET,
  REACT_APP_ROUTE_PLAYLIST,
  REACT_APP_ROUTE_PLAYLIST_PARAM_ID,
  REACT_APP_ROUTE_PROFILE,
  REACT_APP_ROUTE_PROFILE_FAVORITES,
  REACT_APP_ROUTE_PROFILE_PARAM_ID,
  REACT_APP_ROUTE_PROFILE_SUBSCRIBERS,
  REACT_APP_ROUTE_PROFILE_SUBSCRIPTIONS,
  REACT_APP_ROUTE_PROFILE_TRACKS,
  REACT_APP_ROUTE_SEARCH,
  REACT_APP_ROUTE_SIGN_IN,
  REACT_APP_ROUTE_SIGN_UP,
  REACT_APP_ROUTE_TRACK,
  REACT_APP_ROUTE_TRACK_PARAM_ID,
  REACT_APP_ROUTE_UPLOAD,
  REACT_APP_ROUTE_UPLOAD_ALBUM,
  REACT_APP_ROUTE_UPLOAD_TRACK,
} = process.env;

export const ClientConfig: IClientConfig = {
  client_uri: REACT_APP_CLIENT_URI,
  server_uri: REACT_APP_SERVER_URI,
  google_client_id: REACT_APP_GOOGLE_CLIENT_ID,
  local: {
    id: REACT_APP_LOCAL_ID,
    token: REACT_APP_LOCAL_TOKEN,
  },
  client_routes: {
    layout: REACT_APP_ROUTE_LAYOUT,
    not_found: REACT_APP_ROUTE_NOT_FOUND,
    auth: {
      sign_in: REACT_APP_ROUTE_SIGN_IN,
      sign_up: REACT_APP_ROUTE_SIGN_UP,
      email: REACT_APP_ROUTE_EMAIL,
      email_confirm: REACT_APP_ROUTE_EMAIL_CONFIRM,
      password_forgot: REACT_APP_ROUTE_PASSWORD_FORGOT,
      password_reset: REACT_APP_ROUTE_PASSWORD_RESET,
    },
    admin: REACT_APP_ROUTE_ADMIN,
    album: {
      index: REACT_APP_ROUTE_ALBUM,
      param: REACT_APP_ROUTE_ALBUM_PARAM_ID,
    },
    playlist: {
      index: REACT_APP_ROUTE_PLAYLIST,
      param: REACT_APP_ROUTE_PLAYLIST_PARAM_ID,
    },
    track: {
      index: REACT_APP_ROUTE_TRACK,
      param: REACT_APP_ROUTE_TRACK_PARAM_ID,
    },
    profile: {
      index: REACT_APP_ROUTE_PROFILE,
      param: REACT_APP_ROUTE_PROFILE_PARAM_ID,
      favorites: REACT_APP_ROUTE_PROFILE_FAVORITES,
      tracks: REACT_APP_ROUTE_PROFILE_TRACKS,
      subscribers: REACT_APP_ROUTE_PROFILE_SUBSCRIBERS,
      subscriptions: REACT_APP_ROUTE_PROFILE_SUBSCRIPTIONS,
    },
    search: REACT_APP_ROUTE_SEARCH,
    upload: {
      index: REACT_APP_ROUTE_UPLOAD,
      track: REACT_APP_ROUTE_UPLOAD_TRACK,
      album: REACT_APP_ROUTE_UPLOAD_ALBUM,
    },
  },
};
