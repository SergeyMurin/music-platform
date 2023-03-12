import * as UserActionCreators from "./userActions";
import * as TrackActionCreators from "./trackActions";
import * as PlayerActionCreators from "./playerActions";

export default {
  ...UserActionCreators,
  ...TrackActionCreators,
  ...PlayerActionCreators,
};
