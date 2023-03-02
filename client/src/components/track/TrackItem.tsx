import React, { useEffect, useState } from "react";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { PlayPauseButton } from "../button/togglePlayButton/play.pause.button";
import { getUserAsync } from "../../helpers/requests/userRequests";
import { ClientConfig } from "../../clientConfig";
import { ButtonManager, ButtonManagerType } from "../button/ButtonManager";

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
          <ButtonManager
            type={ButtonManagerType.PLAY}
            payload={isCurrent(track) ? { track: currentTrack } : { track }}
          />
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
          <ButtonManager
            type={ButtonManagerType.LIKE}
            payload={isCurrent(track) ? { track: currentTrack } : { track }}
          />

          <ButtonManager
            type={ButtonManagerType.DOWNLOAD}
            payload={{ trackId: track.id, fileName: track.title }}
          />
        </div>
      </div>
    </div>
  );
};
