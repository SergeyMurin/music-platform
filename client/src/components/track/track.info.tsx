import React, { useEffect, useState } from "react";
import { ITrack } from "../../types/track";
import { IUser } from "../../types/user";
import { useActions } from "../../hooks/useActions";
import { useNavigate, useParams } from "react-router-dom";
import { PlayPauseButton } from "../button/play.pause.button";
import { LikeButton } from "../button/like.button";
import { DownloadButton } from "../button/download.button";
import axios from "axios";
import "./track.css";
import {
  fetchTrackGenres,
  fetchTrackInfo,
  fetchTrackTags,
} from "../../requests/tracks";

export const fetchAuthorInfo = async (id: any) => {
  const response = await axios.get("http://localhost:5000/user", {
    params: { id },
  });
  return response.data;
};

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
    fetchTrackInfo(id as string).then((data) => {
      setTrack(data);
      setTracks([data]);
    });
  }, [id]);

  useEffect(() => {
    if (track) {
      fetchAuthorInfo(track.user_id).then((data) => setAuthor(data));
      fetchTrackGenres(track.id).then((data) => setGenres(data));
      fetchTrackTags(track.id).then((data) => setTags(data));
    }
  }, [track]);

  const lyricsHandler = () => {
    setShowLyrics(!showLyrics);
  };

  const authorClickHandler = () => {
    let href = window.location.href;
    href = href
      .split("/")
      [href.split("/").length - 1].split("?")[0]
      .split(" ")[0];
    navigate(`../profile/${author?.id}`);
  };

  return (
    <div className={"track_page"}>
      {!track && <div className={"track_card"}></div>}
      {track && author && (
        <>
          <div className={"track_card"}>
            <div className={"track_card_img"}>
              <img src={track.picture_url} />
            </div>
            <div className={"card_info"}>
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
                  <DownloadButton track_id={track.id} fileName={track.title} />
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
