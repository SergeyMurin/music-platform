import React, { useEffect, useRef, useState } from "react";
import { PlayerElement } from "./player.element";
import "./player.scss";

const initTracks = [
  {
    title: "AAa",
    track_url:
      "https://soundtracks.fra1.digitaloceanspaces.com/tracks%2Fa3bc52e2-10aa-450e-8940-22233b57fe8d",
    progress: 0,
    length: 0,
  },
  {
    title: "BBB",
    track_url:
      "https://soundtracks.fra1.digitaloceanspaces.com/tracks%2Fa3bc52e2-10aa-450e-8940-22233b57fe8d",
    progress: 0,
    length: 0,
  },
  {
    title: "CCC",
    track_url:
      "https://soundtracks.fra1.digitaloceanspaces.com/tracks%2Fa3bc52e2-10aa-450e-8940-22233b57fe8d",
    progress: 0,
    length: 0,
  },
];

export const Player: React.FC = () => {
  const [tracks, setTracks] = useState(initTracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(initTracks[0]);
  const audioElem: any = useRef();

  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isPlaying, currentTrack]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentTrack({
      ...currentTrack,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };

  return (
    <div className={"player"}>
      <audio
        src={currentTrack.track_url}
        ref={audioElem}
        onTimeUpdate={onPlaying}
      />
      <PlayerElement
        tracks={tracks}
        setTracks={setTracks}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioElem={audioElem}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      />
    </div>
  );
};
