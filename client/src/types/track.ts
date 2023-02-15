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
  url: string;
  album_id: string;
  //comments: IComment[];
}

export interface ITag {
  id: string;
  title: string;
  amount: number;
}

export interface IGenre {
  id: string;
  title: string;
}

export interface TrackState {
  tracks: ITrack[] | null;
  popularTracks: ITrack[] | null;
  genres: IGenre[] | null;
  tags: ITag[] | null;
  error: string;
}

export enum TrackActionTypes {
  FETCH_TRACKS = "FETCH_TRACKS",
  SET_TRACKS = "SET_TRACKS",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
  FETCH_GENRES = "FETCH_GENRES",
  FETCH_TAGS = "FETCH_TAGS",

  FETCH_POPULAR_TRACKS = "FETCH_POPULAR_TRACKS",
}

interface FetchTracksAction {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: ITrack[] | null;
}

interface FetchTracksErrorAction {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

interface ISetTracks {
  type: TrackActionTypes.SET_TRACKS;
  payload: ITrack[];
}

interface IFetchGenres {
  type: TrackActionTypes.FETCH_GENRES;
  payload: IGenre[];
}

interface IFetchTags {
  type: TrackActionTypes.FETCH_TAGS;
  payload: ITag[];
}

interface IFetchPopularTracks {
  type: TrackActionTypes.FETCH_POPULAR_TRACKS;
  payload: ITrack[];
}

export type TrackAction =
  | FetchTracksAction
  | FetchTracksErrorAction
  | IFetchGenres
  | IFetchTags
  | ISetTracks
  | IFetchPopularTracks;
