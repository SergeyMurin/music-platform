import React, { useState } from "react";
import { TrackUploadForm } from "./track.upload.form";
import axios from "axios";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

export const TrackUpload: React.FC = () => {
  const [uploadTrackError, setUploadTrackError] = useState("");
  const { token } = useTypedSelector((state) => state.user);
  const onSubmit = (dataValues: any) => {
    trackUpload(dataValues).then();
  };

  const trackUpload = async (dataValues: any) => {
    const formData = new FormData();
    formData.append("track", dataValues.track[0]);
    formData.append("picture", dataValues.picture[0]);
    formData.append("title", dataValues.title);
    formData.append("lyrics", dataValues.lyrics);
    formData.append("tags", dataValues.tags);
    formData.append("genres", dataValues.genres);
    formData.append("explicit", dataValues.explicit);
    debugger;
    await axios
      .post("http://localhost:5000/track", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => setUploadTrackError(error.response.data.message));
  };

  return (
    <div>
      <TrackUploadForm onsubmit={onSubmit} error={uploadTrackError} />
    </div>
  );
};
