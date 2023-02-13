import React, { useEffect, useRef, useState } from "react";
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsFillSkipEndCircleFill,
  BsFillSkipStartCircleFill,
} from "react-icons/bs";

import playIcon from "../../assets/player/play-icon.svg";
import pauseIcon from "../../assets/player/pause-icon.svg";
import nextIcon from "../../assets/player/next-icon.svg";
import previousIcon from "../../assets/player/previous-icon.svg";
import repeatIcon from "../../assets/player/repeat-icon.svg";

type Props = {
  tracks: any;
  setTracks: any;
  isPlaying: any;
  setIsPlaying: any;
  audioElem: any;
  currentTrack: any;
  setCurrentTrack: any;
};

export const PlayerElement: React.FC<Props> = ({
  tracks,
  setTracks,
  isPlaying,
  setIsPlaying,
  audioElem,
  currentTrack,
  setCurrentTrack,
}) => {
  const [progress, setProgress] = useState(currentTrack.progress);
  const clickRef: any = useRef();

  setInterval(() => {
    setProgress(currentTrack.progress);
  }, 1000);

  useEffect(() => {
    if (currentTrack.progress === 100) {
      skipToNext();
    }
  }, [progress]);

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const checkWidth = (e: any) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divProgress = (offset / width) * 100;
    audioElem.current.currentTime = (divProgress / 100) * currentTrack.length;
  };

  const skipBack = () => {
    const index = tracks.findIndex((x: any) => x.title === currentTrack.title);
    if (index === 0) {
      setCurrentTrack(tracks[tracks.length - 1]);
    } else {
      setCurrentTrack(tracks[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const skipToNext = () => {
    const index = tracks.findIndex((x: any) => x.title === currentTrack.title);

    if (index === tracks.length - 1) {
      setCurrentTrack(tracks[0]);
    } else {
      setCurrentTrack(tracks[index + 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const convertToTime = (progress: any, totalTime: any) => {
    const timeInSeconds = (progress / 100) * totalTime;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={"player-element"}>
      <div className="player_container">
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
              onClick={skipBack}
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
              onClick={skipToNext}
              alt={"next"}
            />
          </div>

          <div className={"player__timer"}>
            <span>
              {convertToTime(currentTrack.progress, currentTrack.length)}
            </span>
            <div
              className="navigation_wrapper"
              onClick={checkWidth}
              ref={clickRef}
            >
              <div
                className="seek_bar"
                style={{ width: `${currentTrack.progress + "%"}` }}
              ></div>
            </div>
            <span>{convertToTime(100, currentTrack.length)}</span>
          </div>
          <img
            src={repeatIcon}
            className="btn_action"
            onClick={skipToNext}
            alt={"repeat"}
          />
        </div>
      </div>
    </div>
  );
};
