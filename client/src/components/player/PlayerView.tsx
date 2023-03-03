import React, { useEffect, useRef } from "react";
import playIcon from "../../assets/player/play-icon.svg";
import pauseIcon from "../../assets/player/pause-icon.svg";
import nextIcon from "../../assets/player/next-icon.svg";
import previousIcon from "../../assets/player/previous-icon.svg";
import repeatIcon from "../../assets/player/repeat-icon.svg";
import repeatOnIcon from "../../assets/player/repeat-on-icon.svg";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { ITrack } from "../../types/track";
import MyMarquee from "./marquee";
import { useNavigate } from "react-router-dom";
import { ClientConfig } from "../../clientConfig";
import { ButtonManager, ButtonManagerType } from "../button/ButtonManager";
import { IUser } from "../../types/user";

type Props = {
  audioElem: any;
  author: IUser | null;
};

export const PlayerView: React.FC<Props> = ({ audioElem, author }) => {
  const clickRef: any = useRef();
  const volumeRef: any = useRef();

  const {
    queue,
    volume,
    progress,
    isPlaying,
    duration,
    currentTrack,
    onRepeat,
  } = useTypedSelector((state) => state.player);
  const { setVolume, setOnRepeat, setIsPlaying, setCurrentTrack } =
    useActions();

  useEffect(() => {
    if (progress === 100) {
      if (onRepeat) {
        audioElem.current.currentTime = 0;
        audioElem.current.play();
        return;
      }
      skipToNext();
      setIsPlaying(isPlaying);
    }
  }, [progress]);

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const checkWidth = (e: any) => {
    const width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divProgress = (offset / width) * 100;
    audioElem.current.currentTime =
      (divProgress > 100 ? 100 : divProgress / 100) * duration;
  };

  const setVolumeHandler = (e: any) => {
    const width = volumeRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    let volume = (offset / width) * 100;
    if (volume < 0) {
      volume = 0;
    }

    audioElem.current.volume = volume > 100 ? 1 : volume / 100;
    setVolume(volume > 100 ? 1 : volume / 100);
  };

  const skipBack = () => {
    if (onRepeat) {
      audioElem.current.currentTime = 0;
      return;
    } else if (!queue) {
      return;
    }

    const index = queue.findIndex((x: ITrack) => x.id === currentTrack?.id);
    if (index === 0) {
      setCurrentTrack(queue[queue.length - 1]);
    } else {
      setCurrentTrack(queue[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const skipToNext = () => {
    if (onRepeat) {
      audioElem.current.currentTime = 0;
      return;
    } else if (!queue) {
      return;
    }

    const index = queue.findIndex((x: any) => x.id === currentTrack?.id);

    if (index === queue.length - 1) {
      setCurrentTrack(queue[0]);
    } else {
      setCurrentTrack(queue[index + 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const repeatHandler = () => {
    setOnRepeat(!onRepeat);
  };

  const convertToTime = (progress: any, totalTime: any) => {
    progress = progress ? progress : 0;
    totalTime = totalTime ? totalTime : 0;
    const timeInSeconds = (progress / 100) * totalTime;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const navigate = useNavigate();
  const trackClickHandler = () => {
    if (!currentTrack) return;
    navigate(`/${ClientConfig.client_routes.track.index}/${currentTrack.id}`);
  };
  const authorClickHandler = () => {
    if (!currentTrack) return;
    navigate(
      `/${ClientConfig.client_routes.profile.index}/${currentTrack.user_id}`
    );
  };

  return (
    <div className={"player-element"}>
      <div className="player_container">
        <div className={"player__track-info"}>
          <div className={"player_pic"}>
            <img
              onClick={trackClickHandler}
              style={{ cursor: "pointer" }}
              src={currentTrack?.picture_url}
              alt={"track picture"}
            />
          </div>
          <div className="title">
            <MyMarquee
              text={currentTrack ? currentTrack.title : ""}
              activateLength={20}
              onClickEvent={trackClickHandler}
            />
            <MyMarquee
              text={author ? author.username : ""}
              activateLength={20}
              onClickEvent={authorClickHandler}
            />
          </div>
        </div>
        <div className="navigation">
          <div className="controls">
            <img
              src={previousIcon}
              className="btn_action"
              onClick={() => {
                setTimeout(() => {
                  skipBack();
                }, 300);
              }}
              alt={"previous"}
            />
            {isPlaying ? (
              <img
                src={pauseIcon}
                className="btn_action pp"
                onClick={PlayPause}
                alt={"pause"}
              />
            ) : (
              <img
                src={playIcon.toString()}
                className="btn_action pp"
                onClick={PlayPause}
                alt={"play"}
              />
            )}
            <img
              src={nextIcon}
              className="btn_action"
              onClick={() => {
                setTimeout(() => {
                  skipToNext();
                }, 300);
              }}
              alt={"next"}
            />

            {/*Repeat*/}
            {!onRepeat && (
              <img
                src={repeatIcon}
                className="btn_action replay"
                onClick={repeatHandler}
                alt={"repeat"}
              />
            )}

            {onRepeat && (
              <img
                src={repeatOnIcon}
                className={`btn_action replay ${onRepeat ? "active" : ""}`}
                onClick={repeatHandler}
                alt={"repeat"}
              />
            )}
          </div>

          <div className={"player__timer"}>
            <span className={"left"}>{convertToTime(progress, duration)}</span>
            <div
              className="navigation_wrapper"
              onClick={checkWidth}
              ref={clickRef}
            >
              <div
                className="seek_bar"
                style={{ width: `${progress + "%"}` }}
              ></div>
            </div>
            <span className={"right"}>{convertToTime(100, duration)}</span>
          </div>

          <div className={"volume_container"}>
            <div
              className="volume_bar"
              onClick={setVolumeHandler}
              ref={volumeRef}
            >
              <div
                className="volume"
                style={{ width: `${volume * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={"like-download"}>
            <ButtonManager type={ButtonManagerType.LIKE} track={currentTrack} />
            <ButtonManager
              type={ButtonManagerType.DOWNLOAD}
              trackId={currentTrack ? currentTrack.id : ""}
              fileName={currentTrack ? currentTrack.title : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
