import React, { useEffect, useRef, useState } from "react";
import playIcon from "../../assets/player/play-icon.svg";
import pauseIcon from "../../assets/player/pause-icon.svg";
import nextIcon from "../../assets/player/next-icon.svg";
import previousIcon from "../../assets/player/previous-icon.svg";
import repeatIcon from "../../assets/player/repeat-icon.svg";

type Props = {
  tracks: any;

  isPlaying: any;
  setIsPlaying: any;
  audioElem: any;
  currentTrack: any;
  setCurrentTrack: any;
};

export const PlayerElement: React.FC<Props> = ({
  tracks,
  isPlaying,
  setIsPlaying,
  audioElem,
  currentTrack,
  setCurrentTrack,
}) => {
  const clickRef: any = useRef();
  const volumeRef: any = useRef();

  const [volume, setVolumeState] = useState(
    audioElem?.current?.volume ? audioElem?.current?.volume : 1
  );

  useEffect(() => {});

  useEffect(() => {
    if (currentTrack.progress === 100) {
      skipToNext();
      setIsPlaying(isPlaying);
    }
  }, [currentTrack.progress]);

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const checkWidth = (e: any) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divProgress = (offset / width) * 100;
    audioElem.current.currentTime =
      (divProgress > 100 ? 100 : divProgress / 100) * currentTrack.length;
  };

  const setVolume = (e: any) => {
    let width = volumeRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    let volume = (offset / width) * 100;
    if (volume < 0) {
      volume = 0;
    }

    audioElem.current.volume = volume > 100 ? 1 : volume / 100;
    setVolumeState(volume > 100 ? 1 : volume / 100);
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

          <div className="volume_bar" onClick={setVolume} ref={volumeRef}>
            <div className="volume" style={{ width: `${volume * 100}%` }}></div>
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
