import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ITrack } from "../types/track";
import { IUser } from "../types/user";
import { PlayPauseButton } from "../components/button/play.pause.button";
import { LikeButton } from "../components/button/like.button";
import { useActions } from "../hooks/useActions";
import { DownloadButton } from "../components/button/download.button";
import { TrackInfo } from "../components/track/track.info";

export const TrackPage: React.FC = () => {
  return <TrackInfo />;
};
