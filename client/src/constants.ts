type IConstants = {
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
};

export const Constants: IConstants = {
  client_uri: "http://localhost:3000",
  server_uri: "http://localhost:5000",
  google_client_id:
    "836445093751-38eejskvs0dioadp0sstf09j8tphasqo.apps.googleusercontent.com",
  local: {
    id: "id",
    token: "token",
  },
  server_routes: {
    user: {},
  },
};
