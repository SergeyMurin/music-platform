import axios from "axios";
import { Constants } from "../constants";

export const getSearchAll = async (query: string): Promise<any> => {
  return axios.get(
    `${Constants.server_uri}/user/search?term=${query}&type=all`
  );
};
