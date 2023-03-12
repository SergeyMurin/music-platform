import axios, { AxiosResponse } from "axios";
import { ClientConfig } from "../../clientConfig";
import { authorizationFieldWithLocalToken } from "../helpers";

export const createFavoriteTrackAsync = async (
  track_id: string
): Promise<AxiosResponse> => {
  return await axios.post(
    `${ClientConfig.server_uri}/favorite-track`,
    { track_id },
    {
      headers: {
        ...authorizationFieldWithLocalToken(),
      },
    }
  );
};

export const removeFavoriteTrackAsync = async (
  favorite_id: string
): Promise<AxiosResponse> => {
  return await axios.delete(`${ClientConfig.server_uri}/favorite`, {
    data: { favorite_id },
    headers: {
      ...authorizationFieldWithLocalToken(),
    },
  });
};

export const getFavoritesAsync = async (id: string): Promise<AxiosResponse> => {
  return await axios.get(`${ClientConfig.server_uri}/favorite/all`, {
    params: { id },
  });
};
