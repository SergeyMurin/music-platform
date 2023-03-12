import { Dispatch } from "react";
import { PlayerAction, PlayerActionTypes } from "../../types/player";
import { ITrack } from "../../types/track";

export const setQueue = (tracks: ITrack[] | null) => {
  return (dispatch: Dispatch<PlayerAction>) => {
    dispatch({ type: PlayerActionTypes.SET_QUEUE, payload: tracks });
  };
};

export const setCurrentTrack = (track: ITrack | null) => {
  return (dispatch: Dispatch<PlayerAction>) => {
    dispatch({ type: PlayerActionTypes.SET_CURRENT_TRACK, payload: track });
  };
};

export const setCurrentTime = (time: number) => {
  return (dispatch: Dispatch<PlayerAction>) => {
    dispatch({ type: PlayerActionTypes.SET_CURRENT_TIME, payload: time });
  };
};

export const setProgress = (currentTime: number, duration: number) => {
  return (dispatch: Dispatch<PlayerAction>) => {
    dispatch({
      type: PlayerActionTypes.SET_PROGRESS,
      payload: (currentTime / duration) * 100,
    });
  };
};

export const setDuration = (time: number) => {
  return (dispatch: Dispatch<PlayerAction>) => {
    dispatch({ type: PlayerActionTypes.SET_DURATION, payload: time });
  };
};

export const setVolume = (volume: number) => {
  return (dispatch: Dispatch<PlayerAction>) => {
    dispatch({ type: PlayerActionTypes.SET_VOLUME, payload: volume });
  };
};

export const setIsPlaying = (b: boolean) => {
  return (dispatch: Dispatch<PlayerAction>) => {
    dispatch({ type: PlayerActionTypes.SET_IS_PLAYING, payload: b });
  };
};

export const setIsShuffled = (b: boolean) => {
  return (dispatch: Dispatch<PlayerAction>) => {
    dispatch({ type: PlayerActionTypes.SET_IS_SHUFFLED, payload: b });
  };
};

export const setOnRepeat = (b: boolean) => {
  return (dispatch: Dispatch<PlayerAction>) => {
    dispatch({ type: PlayerActionTypes.SET_ON_REPEAT, payload: b });
  };
};
