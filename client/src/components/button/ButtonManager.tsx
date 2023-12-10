import React from "react";
import { ToggleLikeButton } from "./toggleLikeButton/ToggleLikeButton";
import { ITrack } from "../../types/track";
import { TogglePlayButton } from "./togglePlayButton/TogglePlayButton";
import { IUser } from "../../types/user";
import { ToggleSubscribeButton } from "./toggleSubscribeButton/ToggleSubscribeButton";
import { DownloadButton } from "./downloadButton/downloadButton";

export enum ButtonManagerType {
  LIKE = "like",
  SUBSCRIBE = "subscribe",
  PLAY = "play",
  DOWNLOAD = "download",
}

type ButtonPlayPausePayload = {
  type: ButtonManagerType.PLAY;
  track: ITrack | null;
};

type ButtonLikePayload = {
  type: ButtonManagerType.LIKE;
  track: ITrack | null;
};

type ButtonSubscribePayload = {
  type: ButtonManagerType.SUBSCRIBE;
  user: IUser | null;
};

type ButtonDownloadPayload = {
  type: ButtonManagerType.DOWNLOAD;
  trackId: string;
  fileName: string;
  url: string;
};

type Props =
  | ButtonDownloadPayload
  | ButtonSubscribePayload
  | ButtonPlayPausePayload
  | ButtonLikePayload;

export const ButtonManager: React.FC<Props> = (payload) => {
  switch (payload.type) {
    case ButtonManagerType.LIKE: {
      const { track } = payload;
      if (!track) return null;
      return <ToggleLikeButton track={track} />;
    }
    case ButtonManagerType.DOWNLOAD: {
      const { trackId, fileName, url } = payload;
      if (!trackId && !fileName) return null;
      return <DownloadButton trackId={trackId} fileName={fileName} url={url} />;
    }
    case ButtonManagerType.SUBSCRIBE: {
      const { user } = payload;
      if (!user) return null;
      return <ToggleSubscribeButton user={user} />;
    }
    case ButtonManagerType.PLAY: {
      const { track } = payload;
      if (!track) return null;
      return <TogglePlayButton track={track} />;
    }
    default: {
      return null;
    }
  }
};
