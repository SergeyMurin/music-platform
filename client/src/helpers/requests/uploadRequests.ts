import axios from "axios";
import { ClientConfig } from "../../clientConfig";

export const uploadTrackAsync = async (
  formData: FormData,
  token: string
): Promise<any> => {
  return axios.post(`${ClientConfig.server_uri}/track`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
