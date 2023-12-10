import React, { useEffect, useState } from "react";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { getUserAsync } from "../../helpers/requests/userRequests";
import { ClientConfig } from "../../clientConfig";
import { ButtonManager, ButtonManagerType } from "../button/ButtonManager";
import { IUser } from "../../types/user";

type Props = {
  track: ITrack;
  tracks: ITrack[];
};

export const TrackItem: React.FC<Props> = ({ track }) => {
  const { currentTrack } = useTypedSelector((state) => state.player);
  const [author, setAuthor] = useState<IUser>();
  const navigate = useNavigate();

  const trackItemEffect = () => {
    const trackItemEffectAsync = async () => {
      const response = await getUserAsync(track.user_id);
      setAuthor(response.data);
    };
    trackItemEffectAsync().catch((error) => console.error(error));
  };

  useEffect(trackItemEffect, []);

  const trackClickHandler = () => {
    navigate(`/${ClientConfig.client_routes.track.index}/${track.id}`);
  };

  const authorClickHandler = () => {
    if (!author) return;
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
            track={isCurrent(track) ? currentTrack : track}
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
            track={isCurrent(track) ? currentTrack : track}
          />

          <ButtonManager
            type={ButtonManagerType.DOWNLOAD}
            trackId={
              isCurrent(track) && currentTrack ? currentTrack?.id : track.id
            }
            fileName={
              isCurrent(track) && currentTrack
                ? currentTrack?.title
                : track.title
            }
            url={
              isCurrent(track) && currentTrack ? currentTrack?.url : track.url
            }
          />
        </div>
      </div>
    </div>
  );
};
