import * as UserActionCreators from "./user.actions";
import * as TrackActionCreators from "./track.actions";
import * as PlayerActionCreators from "./player.actions";

export default {
  ...UserActionCreators,
  ...TrackActionCreators,
  ...PlayerActionCreators,
};
