import axios from "axios";
import { ClientConfig } from "../../client.config";

export const getUserAsync = (id: string): Promise<any> => {
  return axios.get(`${ClientConfig.server_uri}/user`, {
    params: { id },
  });
};
