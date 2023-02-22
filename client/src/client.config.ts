interface IClientConfig {
  client_uri: string;
  server_uri: string;
  google_client_id: string;
  local: {
    id: string;
    token: string;
  };
  server_routes: {
    user: {};
  };
}

export const ClientConfig: IClientConfig = {
  client_uri: process.env.REACT_APP_CLIENT_URI,
  server_uri: process.env.REACT_APP_SERVER_URI,
  google_client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  local: {
    id: process.env.REACT_APP_LOCAL_ID,
    token: process.env.REACT_APP_LOCAL_TOKEN,
  },
  server_routes: {
    user: {},
  },
};
