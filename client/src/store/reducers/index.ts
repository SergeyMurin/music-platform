import { combineReducers } from "redux";
import { trackReducer } from "./track.reducer";
import { playerReducer } from "./player.reducer";

export const rootReducer = combineReducers({
  track: trackReducer,
  player: playerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
