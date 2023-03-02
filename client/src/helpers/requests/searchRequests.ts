import axios from "axios";
import { ClientConfig } from "../../clientConfig";

export const getSearchAllAsync = async (query: string): Promise<any> => {
  return axios.get(
    `${ClientConfig.server_uri}/user/search?term=${query}&type=all`
  );
};
