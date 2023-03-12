import { combineReducers } from "redux";
import { trackReducer } from "./trackReducer";
import { playerReducer } from "./playerReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  track: trackReducer,
  player: playerReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
