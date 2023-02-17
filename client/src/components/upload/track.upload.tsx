import React, { useEffect, useState } from "react";
import { TrackUploadForm } from "./track.upload.form";
import axios from "axios";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import "./upload.css";

export const TrackUpload: React.FC = () => {
  const [uploadTrackError, setUploadTrackError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { token } = useTypedSelector((state) => state.user);
  const { fetchTags, fetchGenres } = useActions();

  useEffect(() => {
    fetchTags();
    fetchGenres();
  }, []);
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
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          setUploadSuccess(true);
        }
      })
      .catch((error) =>
        error ? setUploadTrackError(error?.response?.data.message) : null
      );
  };

  return (
    <div>
      <h1>Soundtrack upload form</h1>
      <hr />
      <TrackUploadForm
        onsubmit={onSubmit}
        error={uploadTrackError}
        success={uploadSuccess}
      />
    </div>
  );
};
