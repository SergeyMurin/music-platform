import React from "react";
import { ToggleLikeButton } from "./toggleLikeButton/ToggleLikeButton";
import { ITrack } from "../../types/track";
import { DownloadButton } from "./download.button";
import { PlayPauseButton } from "./togglePlayButton/play.pause.button";
import { IUser } from "../../types/user";
import { ToggleSubscribeButton } from "./toggleSubscribeButton/ToggleSubscribeButton";

export enum ButtonManagerType {
  LIKE = "like",
  SUBSCRIBE = "subscribe",
  PLAY = "play",
  DOWNLOAD = "download",
}

type ButtonPlayPausePayload = {
  track: ITrack | null;
};

type ButtonLikePayload = {
  track: ITrack | null;
};

type ButtonSubscribePayload = { user: IUser | null };

type ButtonDownloadPayload = {
  trackId: string;
  fileName: string;
};

type Props = {
  type: ButtonManagerType;
  payload:
    | ButtonDownloadPayload
    | ButtonSubscribePayload
    | ButtonPlayPausePayload
    | ButtonLikePayload;
};

export const ButtonManager: React.FC<Props> = ({ type, payload }) => {
  switch (type) {
    case ButtonManagerType.LIKE: {
      const { track } = payload as ButtonLikePayload;
      if (!track) return null;
      return <ToggleLikeButton track={track} />;
    }
    case ButtonManagerType.DOWNLOAD: {
      const { trackId, fileName } = payload as ButtonDownloadPayload;
      if (!trackId && !fileName) return null;
      return <DownloadButton trackId={trackId} fileName={fileName} />;
    }
    case ButtonManagerType.SUBSCRIBE: {
      const { user } = payload as ButtonSubscribePayload;
      if (!user) return null;
      return <ToggleSubscribeButton user={user} />;
    }
    case ButtonManagerType.PLAY: {
      const { track } = payload as ButtonPlayPausePayload;
      if (!track) return null;
      return <PlayPauseButton track={track} />;
    }
    default: {
      return null;
    }
  }
};
