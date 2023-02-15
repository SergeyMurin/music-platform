import axios from "axios";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

export const createFavoriteTrackAsync = async (token: string, id: string) => {
  return axios
    .post("http://localhost:5000/favorite-track", { track_id: id })
    .then((response) => {})
    .catch((error) => console.error(error));
};
