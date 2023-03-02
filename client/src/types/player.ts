import { ITrack } from "./track";

export interface PlayerState {
  queue: ITrack[] | null;
  currentTrack: ITrack | null;
  currentTime: number;
  duration: number;
  volume: number;
  progress: number;
  isPlaying: boolean;
  isShuffled: boolean;
  onRepeat: boolean;
}

export enum PlayerActionTypes {
  SET_IS_PLAYING = "SET_IS_PLAYING",
  SET_QUEUE = "SET_QUEUE",
  SET_CURRENT_TRACK = "SET_CURRENT_TRACK",
  SET_DURATION = "SET_DURATION",
  SET_CURRENT_TIME = "SET_CURRENT_TIME",
  SET_VOLUME = "SET_VOLUME",
  SET_IS_SHUFFLED = "SET_IS_SHUFFLED",
  SET_ON_REPEAT = "SET_ON_REPEAT",
  SET_PROGRESS = "SET_PROGRESS",
}

interface SetQueueAction {
  type: PlayerActionTypes.SET_QUEUE;
  payload: ITrack[] | null | any;
}

interface SetCurrentTrackAction {
  type: PlayerActionTypes.SET_CURRENT_TRACK;
  payload: ITrack | null | any;
}

interface SetIsPlayingAction {
  type: PlayerActionTypes.SET_IS_PLAYING;
  payload: boolean;
}

interface SetDurationAction {
  type: PlayerActionTypes.SET_DURATION;
  payload: number;
}

interface SetVolumeAction {
  type: PlayerActionTypes.SET_VOLUME;
  payload: number;
}

interface SetCurrentTimeAction {
  type: PlayerActionTypes.SET_CURRENT_TIME;
  payload: number;
}

interface SetIsShuffledAction {
  type: PlayerActionTypes.SET_IS_SHUFFLED;
  payload: boolean;
}

interface SetOnRepeatAction {
  type: PlayerActionTypes.SET_ON_REPEAT;
  payload: boolean;
}

interface SetProgressAction {
  type: PlayerActionTypes.SET_PROGRESS;
  payload: number;
}

export type PlayerAction =
  | SetOnRepeatAction
  | SetIsShuffledAction
  | SetIsPlayingAction
  | SetQueueAction
  | SetCurrentTrackAction
  | SetDurationAction
  | SetVolumeAction
  | SetProgressAction
  | SetCurrentTimeAction;
