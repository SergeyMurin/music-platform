import React, { ReactNode, useState } from "react";
import { LikeButton } from "./toggleLikeButton/LikeButton";
import { ToggleLikeButton } from "./toggleLikeButton/ToggleLikeButton";
import { ITrack } from "../../types/track";
import { DownloadButton } from "./download.button";
import { ButtonSubscribe } from "./button.subscribe";
import { PlayPauseButton } from "./play.pause.button";
import { IUser } from "../../types/user";

export enum UserButtonType {
  LIKE = "like",
  SUBSCRIBE = "subscribe",
  PLAY = "play",
  DOWNLOAD = "download",
}

type ButtonPlayPausePayload = {
  track: ITrack;
};

type ButtonLikePayload = {
  track: ITrack;
};

type ButtonSubscribePayload = { user: IUser };

type ButtonDownloadPayload = {
  trackId: string;
  fileName: string;
};

type Props = {
  type: UserButtonType;
  payload:
    | ButtonDownloadPayload
    | ButtonSubscribePayload
    | ButtonPlayPausePayload
    | ButtonLikePayload;
};

export const ButtonUser: React.FC<Props> = ({ type, payload }) => {
  switch (type) {
    case UserButtonType.LIKE: {
      const { track } = payload as ButtonLikePayload;
      return <ToggleLikeButton track={track} />;
    }
    case UserButtonType.DOWNLOAD: {
      const { trackId, fileName } = payload as ButtonDownloadPayload;
      return <DownloadButton trackId={trackId} fileName={fileName} />;
    }
    case UserButtonType.SUBSCRIBE: {
      const { user } = payload as ButtonSubscribePayload;
      return <ButtonSubscribe user={user} />;
    }
    case UserButtonType.PLAY: {
      const { track } = payload as ButtonPlayPausePayload;
      return <PlayPauseButton track={track} />;
    }
    default: {
      return null;
    }
  }
};
