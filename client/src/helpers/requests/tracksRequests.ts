import axios from "axios";
import { ClientConfig } from "../../clientConfig";
import { getLocalToken, authorizationFieldWithLocalToken } from "../helpers";

export const getTracksAsync = async (id: string): Promise<any> => {
  return axios.get(`${ClientConfig.server_uri}/track/all`, { params: { id } });
};

export const getTrackAsync = async (id: string): Promise<any> => {
  const response = await axios.get(`${ClientConfig.server_uri}/track`, {
    params: { id },
  });
  return response.data;
};

export const getTrackGenresAsync = async (id: string): Promise<any> => {
  const response = await axios.get(`${ClientConfig.server_uri}/genre-track`, {
    params: { id },
  });
  return response.data;
};

export const getTrackTagsAsync = async (id: string): Promise<any> => {
  const response = await axios.get(`${ClientConfig.server_uri}/tag-track`, {
    params: { id },
  });
  return response.data;
};

export const getPopularTracksAsync = async (): Promise<any> => {
  return axios.get(`${ClientConfig.server_uri}/track/all/popular`);
};

export const downloadTrackAsync = async (id: string): Promise<any> => {
  const response = await axios.get(
    `${ClientConfig.server_uri}/track/download`,
    {
      params: { id },
      headers: { ...authorizationFieldWithLocalToken() },
    }
  );
  return response.data;
};
