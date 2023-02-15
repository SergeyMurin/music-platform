import { TrackAction, TrackActionTypes, TrackState } from "../../types/track";

const initialState: TrackState = {
  tracks: [],
  popularTracks: [],
  genres: null,
  tags: null,
  error: "",
};

export const trackReducer = (
  state = initialState,
  action: TrackAction
): TrackState => {
  switch (action.type) {
    case TrackActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, error: action.payload };
    case TrackActionTypes.FETCH_TRACKS:
      return { ...state, tracks: action.payload };
    case TrackActionTypes.SET_TRACKS:
      return { ...state, tracks: action.payload };
    case TrackActionTypes.FETCH_GENRES:
      return { ...state, genres: action.payload };
    case TrackActionTypes.FETCH_TAGS:
      return { ...state, tags: action.payload };
    case TrackActionTypes.FETCH_POPULAR_TRACKS:
      return { ...state, popularTracks: action.payload };
    default:
      return state;
  }
};
