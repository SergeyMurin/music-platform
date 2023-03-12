import axios, { AxiosResponse } from "axios";
import { ClientConfig } from "../../clientConfig";

export const getSearchAllAsync = async (
  query: string
): Promise<AxiosResponse> => {
  return await axios.get(
    `${ClientConfig.server_uri}/user/search?term=${query}&type=all`
  );
};
