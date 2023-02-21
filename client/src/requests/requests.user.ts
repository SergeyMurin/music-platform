import axios from "axios";
import { Constants } from "../constants";

export const getUserAsync = (id: string): Promise<any> => {
  return axios.get(`${Constants.server_uri}/user`, {
    params: { id },
  });
};
