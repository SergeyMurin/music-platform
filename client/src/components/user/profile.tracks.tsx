import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TrackItem } from "../track/track.item";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { getTracksAsync } from "../../helpers/requests/requests.tracks";

enum DisplayedText {
  HEADER = "Tracks:",
}

export const ProfileTracks: React.FC = () => {
  const { id } = useParams();
  const { tracks } = useTypedSelector((state) => state.track);
  const { setTracks } = useActions();
  useEffect(() => {
    if (id) {
      getTracksAsync(id).then((response) => {
        setTracks(response.data);
      });
    }
  }, []);

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
