import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

export const HomePage: React.FC = () => {
  const { tracks } = useTypedSelector((state) => state.track);
  const { currentTrack } = useTypedSelector((state) => state.player);
  const { setCurrentTrack, setQueue, setIsPlaying } = useActions();
  return (
    <div>
      <div>HomePage</div>
      {tracks &&
        tracks.map((track) => {
          return (
            <div key={track.id}>
              <span>{track.id}</span>
              <span>{track.title}</span>
              {currentTrack?.id === track.id && (
                <button
                  onClick={() => {
                    const idx = tracks?.findIndex((x) => x.id === track.id);
                    setCurrentTrack(tracks[idx]);
                    setIsPlaying(false);
                  }}
                >
                  Pause
                </button>
              )}

              {currentTrack?.id !== track.id && (
                <button
                  onClick={() => {
                    const idx = tracks?.findIndex((x) => x.id === track.id);
                    setQueue(tracks);
                    setCurrentTrack(tracks[idx]);
                    setIsPlaying(true);
                  }}
                >
                  Play
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
};
