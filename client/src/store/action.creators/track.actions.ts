import { Dispatch } from "react";
import { ITrack, TrackAction, TrackActionTypes } from "../../types/track";
import axios from "axios";

export const setTracks = (tracks: ITrack[] | null | any) => {
  return (dispatch: Dispatch<TrackAction>) => {
    dispatch({ type: TrackActionTypes.SET_TRACKS, payload: tracks });
  };
};

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/track/all/popular"
      );
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS,
        payload: response.data,
      });
    } catch (e) {}
  };
};

export const fetchGenres = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get("http://localhost:5000/genre/all");
      dispatch({
        type: TrackActionTypes.FETCH_GENRES,
        payload: response.data,
      });
    } catch (e) {}
  };
};

export const fetchTags = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get("http://localhost:5000/tag");
      dispatch({
        type: TrackActionTypes.FETCH_TAGS,
        payload: response.data,
      });
    } catch (e) {}
  };
};
