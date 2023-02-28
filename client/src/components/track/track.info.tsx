import React, { useEffect, useState } from "react";
import { ITrack } from "../../types/track";
import { IUser } from "../../types/user";
import { useActions } from "../../hooks/useActions";
import { useNavigate, useParams } from "react-router-dom";
import { PlayPauseButton } from "../button/play.pause.button";
import { LikeButton } from "../button/like.button";
import { DownloadButton } from "../button/download.button";
import "./track.css";
import {
  getTrackGenresAsync,
  getTrackAsync,
  getTrackTagsAsync,
} from "../../helpers/requests/requests.tracks";
import { getUserAsync } from "../../helpers/requests/requests.user";
import { ClientConfig } from "../../client.config";

export const TrackInfo: React.FC = () => {
  const [track, setTrack] = useState<ITrack | null>(null);
  const [author, setAuthor] = useState<IUser>();
  const [genres, setGenres] = useState<any>();
  const [tags, setTags] = useState<any>();
  const [showLyrics, setShowLyrics] = useState(false);

  const { setTracks } = useActions();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTrackAsync(id as string).then((data) => {
      setTrack(data);
      setTracks([data]);
    });
  }, [id]);

  useEffect(() => {
    if (track) {
      getUserAsync(track.user_id).then((response) => setAuthor(response.data));
      getTrackGenresAsync(track.id).then((response) =>
        setGenres(response.data)
      );
      getTrackTagsAsync(track.id).then((response) => setTags(response.data));
    }
  }, [track]);

  const lyricsHandler = () => {
    setShowLyrics(!showLyrics);
  };

  const authorClickHandler = () => {
    navigate(`/${ClientConfig.client_routes.profile.index}/${author?.id}`);
  };

  return (
    <div className={"track_page"}>
      {!track && <div className={"track_card"}></div>}
      {track && author && (
        <>
          <div className={"track_card"}>
            <div className={"track_card_img"}>
              <img src={track.picture_url} alt={"track picture"} />
            </div>
            <div
              className={"card_info"}
              style={{
                backgroundImage: `url(${track.picture_url})`,
                objectFit: "cover",
              }}
            >
              <div className={"card_info_container"}>
                <h1>{track.title}</h1>
                <h2 className={"fake-link"} onClick={authorClickHandler}>
                  {author.username}
                </h2>

                {genres && (
                  <div id={"genres"}>
                    {genres.map((g: any) => {
                      return <small key={g.id}>{g.title + " "}</small>;
                    })}
                  </div>
                )}

                {tags && (
                  <div id={"tags"}>
                    {tags.map((t: any) => {
                      return <small key={t.id}>{"#" + t.title + " "}</small>;
                    })}
                  </div>
                )}
              </div>
              <div className={"card_buttons"}>
                <div>Likes: {(track as any).likes}</div>

                <PlayPauseButton track={track} />

                <div className={"like-download"}>
                  <LikeButton isForTrack={true} track={track} />
                  <DownloadButton trackId={track.id} fileName={track.title} />
                </div>
              </div>
            </div>
          </div>

          <div className={"after-card"}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {track.lyrics && !showLyrics && (
                <>
                  {" "}
                  <h2>Lyrics:</h2>
                  <button onClick={lyricsHandler}>Show</button>
                </>
              )}
              {track.lyrics && showLyrics && (
                <>
                  {" "}
                  <h2>Lyrics:</h2>
                  <button onClick={lyricsHandler}>Hide</button>
                </>
              )}
            </div>

            {track.lyrics && showLyrics && (
              <>
                <div className={"fade-in-fwd"}>
                  <p> {track.lyrics}</p>
                  <hr />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
