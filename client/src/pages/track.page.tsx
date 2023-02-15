import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ITrack } from "../types/track";
import { IUser } from "../types/user";
import { PlayPauseButton } from "../components/button/play.pause.button";
import { LikeButton } from "../components/button/like.button";
import { useActions } from "../hooks/useActions";
import { DownloadButton } from "../components/button/download.button";

export const TrackPage: React.FC = () => {
  const [track, setTrack] = useState<ITrack | null>(null);
  const [comments, setComments] = useState<any>();
  const [author, setAuthor] = useState<IUser>();
  const [gernes, setGenres] = useState<any>();
  const [tags, setTags] = useState<any>();

  const { setTracks } = useActions();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchTrackInfo(id as string).then((data) => {
      setTrack(data);
      setTracks([data]);
    });
  }, []);

  useEffect(() => {
    if (track) {
      fetchAuthorInfo(track.user_id).then((data) => setAuthor(data));
      fetchTrackGenres(track.id).then((data) => setGenres(data));
      fetchTrackTags(track.id).then((data) => setTags(data));
    }
  }, [track]);

  const fetchTrackInfo = async (id: string) => {
    const response = await axios.get("http://localhost:5000/track", {
      params: { id },
    });
    return response.data;
  };

  const fetchTrackGenres = async (id: string) => {
    const response = await axios.get("http://localhost:5000/genre-track", {
      params: { id },
    });
    return response.data;
  };

  const fetchTrackTags = async (id: string) => {
    const response = await axios.get("http://localhost:5000/tag-track", {
      params: { id },
    });
    return response.data;
  };

  const authorClickHandler = () => {
    let href = window.location.href;
    href = href
      .split("/")
      [href.split("/").length - 1].split("?")[0]
      .split(" ")[0];
    navigate(`../profile/${author?.id}`);
  };

  const fetchAuthorInfo = async (id: any) => {
    const response = await axios.get("http://localhost:5000/user", {
      params: { id },
    });
    return response.data;
  };

  return (
    <div className={"track_page"}>
      {!track && <div className={"track_card"}></div>}
      {track && author && (
        <div className={"track_card"}>
          <img src={track.picture_url} />
          <h1>{track.title}</h1>
          <span className={"fake-link"} onClick={authorClickHandler}>
            {author.username}
          </span>

          {gernes && (
            <div id={"genres"}>
              {gernes.map((g: any) => {
                return <small key={g.id}>{g.title + " "}</small>;
              })}
            </div>
          )}

          {tags && (
            <div id={"genres"}>
              {tags.map((t: any) => {
                return <small key={t.id}>{"#" + t.title + " "}</small>;
              })}
            </div>
          )}

          <PlayPauseButton track={track} />
          <LikeButton isForTrack={true} track={track} />
          <DownloadButton track_id={track.id} fileName={track.title} />

          <div>Likes: {(track as any).likes}</div>
          <hr />
          <div>Lyrics:</div>
          <hr />
        </div>
      )}
    </div>
  );
};
