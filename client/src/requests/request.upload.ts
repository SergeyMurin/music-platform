import axios from "axios";
import { Constants } from "../constants";

export const uploadTrackAsync = async (
  formData: FormData,
  token: string
): Promise<any> => {
  return axios.post(`${Constants.server_uri}/track`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
