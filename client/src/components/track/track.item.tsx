import React, { useEffect, useState } from "react";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { BiUnderline } from "react-icons/all";
import { LikeButton } from "../button/like.button";
import { DownloadButton } from "../button/download.button";
import { useNavigate } from "react-router-dom";
import { PlayPauseButton } from "../button/play.pause.button";

type Props = {
  track: ITrack;
  tracks: ITrack[];
};

export const TrackItem: React.FC<Props> = ({ track, tracks }) => {
  const { isAuth } = useTypedSelector((state) => state.user);
  const { currentTrack, isPlaying } = useTypedSelector((state) => state.player);
  const { setCurrentTrack, setIsPlaying, setQueue } = useActions();
  const navigate = useNavigate();

  const trackClickHandler = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    let href = window.location.href;
    href = href
      .split("/")
      [href.split("/").length - 1].split("?")[0]
      .split(" ")[0];
    if (href === "search") {
      navigate(`../track/${track.id}`);
    } else navigate(`track/${track.id}`);
  };

  const isCurrent = (track: ITrack) => {
    return track.id === currentTrack?.id;
  };

  return (
    <div className={"track-item"} key={track.id}>
      <img
        src={track.picture_url}
        onClick={trackClickHandler}
        style={{ width: "100px", height: "100px" }}
      ></img>
      <span>{track.title}</span>

      <PlayPauseButton track={isCurrent(track) ? currentTrack : track} />

      <LikeButton
        isForTrack={true}
        track={isCurrent(track) ? currentTrack : track}
      />

      <DownloadButton track_id={track.id} fileName={track.title} />
    </div>
  );
};
