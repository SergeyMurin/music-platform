import axios from "axios";
import { ClientConfig } from "../client.config";

export const getSearchAllAsync = async (query: string): Promise<any> => {
  return axios.get(
    `${ClientConfig.server_uri}/user/search?term=${query}&type=all`
  );
};
