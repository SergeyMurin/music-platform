import { Dispatch } from "react";
import { ITrack, TrackAction, TrackActionTypes } from "../../types/track";
import axios from "axios";
import { ClientConfig } from "../../client.config";
import {
  getPopularTracksAsync,
  getTracksAsync,
} from "../../helpers/requests/requests.tracks";

export const setTracks = (tracks: ITrack[] | null | any) => {
  return (dispatch: Dispatch<TrackAction>) => {
    dispatch({ type: TrackActionTypes.SET_TRACKS, payload: tracks });
  };
};

export const fetchTracks = (id: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await getTracksAsync(id);

      dispatch({
        type: TrackActionTypes.FETCH_TRACKS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchPopularTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await getPopularTracksAsync();
      dispatch({
        type: TrackActionTypes.FETCH_POPULAR_TRACKS,
        payload: response.data,
      });
      dispatch({
        type: TrackActionTypes.SET_TRACKS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchGenres = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get(`${ClientConfig.server_uri}/genre/all`);
      dispatch({
        type: TrackActionTypes.FETCH_GENRES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchTags = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get(`${ClientConfig.server_uri}/tag`);
      dispatch({
        type: TrackActionTypes.FETCH_TAGS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
