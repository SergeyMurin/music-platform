import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TrackItem } from "../track/TrackItem";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { getTracksAsync } from "../../helpers/requests/tracksRequests";

enum DisplayedText {
  HEADER = "Tracks:",
}

export const ProfileTracks: React.FC = () => {
  const { id } = useParams();
  const { tracks } = useTypedSelector((state) => state.track);
  const { setTracks } = useActions();

  const profileTracksEffect = () => {
    if (!id) return;
    const profileTracksEffectAsync = async () => {
      const response = await getTracksAsync(id);
      setTracks(response.data);
    };
    profileTracksEffectAsync().catch((error) => console.error(error));
  };
  useEffect(profileTracksEffect, []);

  return (
    <div className={"tracks"}>
      <h2>{DisplayedText.HEADER}</h2>
      <hr />
      {tracks &&
        tracks.map((t: ITrack) => {
          return <TrackItem key={t.id} track={t} tracks={tracks} />;
        })}
    </div>
  );
};
