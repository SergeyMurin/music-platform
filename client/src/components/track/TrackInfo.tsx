import React, { useEffect, useState } from "react";
import { ITrack } from "../../types/track";
import { IUser } from "../../types/user";
import { useActions } from "../../hooks/useActions";
import { useNavigate, useParams } from "react-router-dom";
import { PlayPauseButton } from "../button/togglePlayButton/play.pause.button";
import { ToggleLikeButton } from "../button/toggleLikeButton/ToggleLikeButton";
import { DownloadButton } from "../button/downloadButton/downloadButton";
import "./Track.css";
import {
  getTrackGenresAsync,
  getTrackAsync,
  getTrackTagsAsync,
} from "../../helpers/requests/tracksRequests";
import { getUserAsync } from "../../helpers/requests/userRequests";
import { ClientConfig } from "../../clientConfig";

export const TrackInfo: React.FC = () => {
  const [track, setTrack] = useState<ITrack | null>(null);
  const [author, setAuthor] = useState<IUser>();
  const [genres, setGenres] = useState<any>();
  const [tags, setTags] = useState<any>();
  const [showLyrics, setShowLyrics] = useState(false);

  const { setTracks } = useActions();
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const trackEffect = () => {
    if (!id) return;

    const trackEffectAsync = async () => {
      const data = await getTrackAsync(id);
      setTrack(data);
      setTracks([data]);
    };
    trackEffectAsync().catch((error) => console.error(error));
  };

  const trackInfoEffect = () => {
    if (!track) return;
    const trackInfoEffectAsync = async () => {
      const userResponse = await getUserAsync(track.user_id);
      setAuthor(userResponse.data);

      const genresResponse = await getTrackGenresAsync(track.id);
      setGenres(genresResponse.data);

      const tagsResponse = await getTrackTagsAsync(track.id);
      setTags(tagsResponse.data);
    };
    trackInfoEffectAsync().catch((error) => console.error(error));
  };

  useEffect(trackEffect, [id]);
  useEffect(trackInfoEffect, [track]);

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
                  <ToggleLikeButton track={track} />
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
