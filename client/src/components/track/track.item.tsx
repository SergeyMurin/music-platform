import React, { useEffect, useState } from "react";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { LikeButton } from "../button/like.button";
import { DownloadButton } from "../button/download.button";
import { Link, useNavigate } from "react-router-dom";
import { PlayPauseButton } from "../button/play.pause.button";
import { getAuthorAsync } from "../player/player";

type Props = {
  track: ITrack;
  tracks: ITrack[];
};

export const TrackItem: React.FC<Props> = ({ track, tracks }) => {
  const { currentTrack } = useTypedSelector((state) => state.player);
  const [author, setAuthor] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    getAuthorAsync(track.user_id).then((response) => {
      setAuthor(response.data);
    });
  }, []);

  const trackClickHandler = (e: any) => {
    let href = window.location.href;
    href = href
      .split("/")
      [href.split("/").length - 1].split("?")[0]
      .split(" ")[0];
    if (href === "search") {
      navigate(`../track/${track.id}`);
    } else if (href === "favorites") {
      navigate(`../../../track/${track.id}`);
    } else navigate(`track/${track.id}`);
  };

  const authorClickHandler = (e: any) => {
    let href = window.location.href;
    href = href
      .split("/")
      [href.split("/").length - 1].split("?")[0]
      .split(" ")[0];
    if (href === "search") {
      navigate(`../profile/${author.id}`);
    } else navigate(`profile/${author.id}`);
  };

  const isCurrent = (track: ITrack) => {
    return track.id === currentTrack?.id;
  };

  return (
    <div
      className={`track_item fade-in-fwd ${isCurrent(track) ? "current" : ""}`}
      key={track.id}
    >
      <div className={"track_img"}>
        <img src={track.picture_url} onClick={trackClickHandler}></img>
      </div>

      <div className={`track_item_container`}>
        <div className={"play"}>
          <PlayPauseButton track={isCurrent(track) ? currentTrack : track} />
        </div>
        <div className={"info"}>
          <span className={"fake-link"} onClick={trackClickHandler}>
            {track.title}
          </span>
          <span className={"fake-link"} onClick={authorClickHandler}>
            {author?.username}
          </span>
        </div>
        <div className={"like"}>
          <LikeButton
            isForTrack={true}
            track={isCurrent(track) ? currentTrack : track}
          />

          <DownloadButton track_id={track.id} fileName={track.title} />
        </div>
      </div>
    </div>
  );
};
