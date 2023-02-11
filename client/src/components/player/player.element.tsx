import React, { useRef } from "react";
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsFillSkipEndCircleFill,
  BsFillSkipStartCircleFill,
} from "react-icons/bs";

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
  const clickRef: any = useRef();

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
        <div className="title">
          <p>{currentTrack.title}</p>
        </div>
        <div className="navigation">
          <span>
            {convertToTime(currentTrack.progress, currentTrack.length)}
          </span>
          /<span>{convertToTime(100, currentTrack.length)}</span>
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
        </div>
        <div className="controls">
          <BsFillSkipStartCircleFill
            className="btn_action"
            onClick={skipBack}
          />
          {isPlaying ? (
            <BsFillPauseCircleFill
              className="btn_action pp"
              onClick={PlayPause}
            />
          ) : (
            <BsFillPlayCircleFill
              className="btn_action pp"
              onClick={PlayPause}
            />
          )}
          <BsFillSkipEndCircleFill
            className="btn_action"
            onClick={skipToNext}
          />
        </div>
      </div>
    </div>
  );
};
