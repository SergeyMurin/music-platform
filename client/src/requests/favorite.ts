import axios from "axios";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

export const createFavoriteTrackAsync = async (
  token: string,
  track_id: string
) => {
  return axios.post(
    "http://localhost:5000/favorite-track",
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
) => {
  return axios.delete("http://localhost:5000/favorite", {
    data: { favorite_id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFavoritesAsync = async (id: string) => {
  return await axios.get("http://localhost:5000/favorite/all", {
    params: { id },
  });
};
