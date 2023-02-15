import React, { useEffect, useRef, useState } from "react";
import playIcon from "../../assets/player/play-icon.svg";
import pauseIcon from "../../assets/player/pause-icon.svg";
import nextIcon from "../../assets/player/next-icon.svg";
import previousIcon from "../../assets/player/previous-icon.svg";
import repeatIcon from "../../assets/player/repeat-icon.svg";
import repeatOnIcon from "../../assets/player/repeat-on-icon.svg";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { ITrack } from "../../types/track";
import { setQueue } from "../../store/action.creators/player.actions";

type Props = {
  audioElem: any;
};

export const PlayerElement: React.FC<Props> = ({ audioElem }) => {
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
    isShuffled,
  } = useTypedSelector((state) => state.player);
  const {
    setVolume,
    setOnRepeat,
    setIsPlaying,
    setCurrentTrack,
    setIsShuffled,
  } = useActions();

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
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divProgress = (offset / width) * 100;
    audioElem.current.currentTime =
      (divProgress > 100 ? 100 : divProgress / 100) * duration;
  };

  const setVolumeHandler = (e: any) => {
    let width = volumeRef.current.clientWidth;
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
    }

    const index = queue.findIndex((x: ITrack) => x.id === currentTrack.id);
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
    }

    const index = queue.findIndex((x: any) => x.id === currentTrack.id);

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

  return (
    <div className={"player-element"}>
      <div className="player_container">
        {/*img*/}
        {/* <img src={currentTrack.picture_url} style={{ width: "20px" }} />*/}
        <div className={"player__track-info"}>
          <div className="title">
            <p>{currentTrack.title}</p>
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
                }, 500);
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
                }, 500);
              }}
              alt={"next"}
            />
          </div>

          <div className={"player__timer"}>
            <span>{convertToTime(progress, duration)}</span>
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
            <span>{convertToTime(100, duration)}</span>
          </div>

          <div
            className="volume_bar"
            onClick={setVolumeHandler}
            ref={volumeRef}
          >
            <div className="volume" style={{ width: `${volume * 100}%` }}></div>
          </div>

          {/*Repeat*/}
          {!onRepeat && (
            <img
              src={repeatIcon}
              className="btn_action"
              onClick={repeatHandler}
              alt={"repeat"}
            />
          )}

          {onRepeat && (
            <img
              src={repeatOnIcon}
              className="btn_action"
              onClick={repeatHandler}
              alt={"repeat"}
            />
          )}
        </div>
      </div>
    </div>
  );
};
