import axios from "axios";
import { ClientConfig } from "../../clientConfig";

export const getUserAsync = (id: string): Promise<any> => {
  return axios.get(`${ClientConfig.server_uri}/user`, {
    params: { id },
  });
};
