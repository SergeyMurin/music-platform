import {
  PlayerAction,
  PlayerActionTypes,
  PlayerState,
} from "../../types/player";

const initialState: PlayerState = {
  queue: null,
  currentTrack: null,
  currentTime: 0,
  duration: 0,
  volume: 50,
  isPlaying: false,
  isShuffled: false,
  onRepeat: false,
};

export const playerReducer = (
  state = initialState,
  action: PlayerAction
): PlayerState => {
  switch (action.type) {
    case PlayerActionTypes.SET_QUEUE:
      return { ...state, queue: action.payload };
    case PlayerActionTypes.SET_CURRENT_TRACK:
      return { ...state, currentTrack: action.payload };
    case PlayerActionTypes.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case PlayerActionTypes.SET_VOLUME:
      return { ...state, volume: action.payload };
    case PlayerActionTypes.SET_DURATION:
      return { ...state, duration: action.payload };
    case PlayerActionTypes.SET_IS_PLAYING:
      return { ...state, isPlaying: action.payload };
    case PlayerActionTypes.SET_IS_SHUFFLED:
      return { ...state, isShuffled: action.payload };
    case PlayerActionTypes.SET_ON_REPEAT:
      return { ...state, onRepeat: action.payload };
    default:
      return state;
  }
};
