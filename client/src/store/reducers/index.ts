import { combineReducers } from "redux";
import { trackReducer } from "./track.reducer";
import { playerReducer } from "./player.reducer";
import { userReducer } from "./user.reducer";

export const rootReducer = combineReducers({
  track: trackReducer,
  player: playerReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
