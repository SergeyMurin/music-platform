import axios, { AxiosResponse } from "axios";
import { ClientConfig } from "../../clientConfig";

export const getUserAsync = (id: string): Promise<AxiosResponse> => {
  return axios.get(`${ClientConfig.server_uri}/user`, {
    params: { id },
  });
};
