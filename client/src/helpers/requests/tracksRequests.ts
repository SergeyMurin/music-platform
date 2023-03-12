import axios, { AxiosResponse } from "axios";
import { ClientConfig } from "../../clientConfig";
import { authorizationFieldWithLocalToken } from "../helpers";

export const getTracksAsync = async (id: string): Promise<AxiosResponse> => {
  return await axios.get(`${ClientConfig.server_uri}/track/all`, {
    params: { id },
  });
};

export const getTrackAsync = async (id: string): Promise<AxiosResponse> => {
  return await axios.get(`${ClientConfig.server_uri}/track`, {
    params: { id },
  });
};

export const getTrackGenresAsync = async (
  id: string
): Promise<AxiosResponse> => {
  return await axios.get(`${ClientConfig.server_uri}/genre-track`, {
    params: { id },
  });
};

export const getTrackTagsAsync = async (id: string): Promise<AxiosResponse> => {
  return await axios.get(`${ClientConfig.server_uri}/tag-track`, {
    params: { id },
  });
};

export const getPopularTracksAsync = async (): Promise<AxiosResponse> => {
  return axios.get(`${ClientConfig.server_uri}/track/all/popular`);
};

export const downloadTrackAsync = async (
  id: string
): Promise<AxiosResponse> => {
  return await axios.get(`${ClientConfig.server_uri}/track/download`, {
    params: { id },
    headers: { ...authorizationFieldWithLocalToken() },
  });
};
