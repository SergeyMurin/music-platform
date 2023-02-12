export interface IComment {
  id: string;
  user_id: string;
  content: string;
}

export interface ITrack {
  id: string;
  title: string;
  user_id: string;
  lyrics: string;
  plays: number;
  picture_url: string;
  track_url: string;
  album_id: string;
  //comments: IComment[];
}

export interface TrackState {
  tracks: ITrack[];
  error: string;
}

export enum TrackActionTypes {
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
}

interface FetchTracksAction {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: ITrack[];
}

interface FetchTracksErrorAction {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

export type TrackAction = FetchTracksAction | FetchTracksErrorAction;
