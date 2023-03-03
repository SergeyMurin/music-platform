import React, { useEffect, useRef, useState } from "react";
import { PlayerView } from "./PlayerView";
import "./player.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { getUserAsync } from "../../helpers/requests/userRequests";
import { IUser } from "../../types/user";

export const Player: React.FC = () => {
  const audioElem: any = useRef();
  const [author, setAuthor] = useState<IUser | null>(null);

  const { currentTrack, isPlaying, volume } = useTypedSelector(
    (state) => state.player
  );
  const { setDuration, setProgress, setCurrentTime } = useActions();

  const effectCurrentTrack = () => {
    if (!currentTrack) return;
    const request = async () => {
      try {
        const response = await getUserAsync(currentTrack.user_id);
        setAuthor(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    request();
  };

  useEffect(effectCurrentTrack, [currentTrack]);

  useEffect(() => {
    if (isPlaying) {
      audioElem?.current?.play();
    } else {
      audioElem?.current?.pause();
    }
  }, [isPlaying, currentTrack]);

  const onPlaying = () => {
    const duration = audioElem?.current?.duration;
    const ct = audioElem?.current?.currentTime;
    audioElem.current.volume = volume;
    setCurrentTime(ct);
    setDuration(duration);
    setProgress(ct, duration);
  };

  return (
    <>
      <div className={"player"} hidden={!currentTrack}>
        <audio
          src={currentTrack?.url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
        />
        <PlayerView audioElem={audioElem} author={author} />
      </div>
    </>
  );
};
