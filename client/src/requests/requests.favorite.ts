import axios from "axios";
import { Constants } from "../constants";

export const createFavoriteTrackAsync = async (
  token: string,
  track_id: string
): Promise<any> => {
  return axios.post(
    `${Constants.server_uri}/favorite-track`,
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
  return axios.delete(`${Constants.server_uri}/favorite`, {
    data: { favorite_id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFavoritesAsync = async (id: string): Promise<any> => {
  return await axios.get(`${Constants.server_uri}/favorite/all`, {
    params: { id },
  });
};
