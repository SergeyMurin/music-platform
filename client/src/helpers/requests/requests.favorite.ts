import axios from "axios";
import { ClientConfig } from "../../client.config";

export const createFavoriteTrackAsync = async (
  token: string,
  track_id: string
): Promise<any> => {
  return axios.post(
    `${ClientConfig.server_uri}/favorite-track`,
    { track_id: track_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFavoriteTrackAsync = async (
  token: string,
  favorite_id: string
): Promise<any> => {
  return axios.delete(`${ClientConfig.server_uri}/favorite`, {
    data: { favorite_id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFavoritesAsync = async (id: string): Promise<any> => {
  return await axios.get(`${ClientConfig.server_uri}/favorite/all`, {
    params: { id },
  });
};
