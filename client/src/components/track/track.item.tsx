import React, { useEffect, useState } from "react";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { DownloadButton } from "../button/download.button";
import { useNavigate } from "react-router-dom";
import { PlayPauseButton } from "../button/play.pause.button";
import { getUserAsync } from "../../helpers/requests/requests.user";
import { ClientConfig } from "../../client.config";
import { ButtonUser, UserButtonType } from "../button/ButtonUser";

type Props = {
  track: ITrack;
  tracks?: ITrack[];
};

export const TrackItem: React.FC<Props> = ({ track }) => {
  const { currentTrack } = useTypedSelector((state) => state.player);
  const [author, setAuthor] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    getUserAsync(track.user_id).then((response) => {
      setAuthor(response.data);
    });
  }, []);

  const trackClickHandler = () => {
    navigate(`/${ClientConfig.client_routes.track.index}/${track.id}`);
  };

  const authorClickHandler = () => {
    navigate(`/${ClientConfig.client_routes.profile.index}/${author.id}`);
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
        <img
          src={track.picture_url}
          onClick={trackClickHandler}
          alt={"track picture"}
        ></img>
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
          <ButtonUser
            type={UserButtonType.LIKE}
            payload={isCurrent(track) ? currentTrack : track}
          />

          <DownloadButton trackId={track.id} fileName={track.title} />
        </div>
      </div>
    </div>
  );
};
