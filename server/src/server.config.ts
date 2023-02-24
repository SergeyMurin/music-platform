interface IServerConfig {
  client_uri: string;
  server_uri: string;
}

export const ServerConfig: IServerConfig = {
  client_uri: 'http://localhost:3000',
  server_uri: 'http://localhost:5000',
};
