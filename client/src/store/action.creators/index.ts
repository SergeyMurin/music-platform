import * as UserActionCreators from "./user.actions";
import * as TrackActionCreators from "./track.actions";

export default {
  ...UserActionCreators,
  ...TrackActionCreators,
};
