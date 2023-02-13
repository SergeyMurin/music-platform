import React, { useState } from "react";
import { TrackUploadForm } from "./track.upload.form";

export const TrackUpload: React.FC = () => {
  const [uploadTrackError, setUploadTrackError] = useState("");
  const onSubmit = (dataValues: any) => {
    trackUpload(dataValues).then();
  };

  const trackUpload = async (dataValues: any) => {
    //axios
  };

  return (
    <div>
      <TrackUploadForm onsubmit={onSubmit} error={uploadTrackError} />
    </div>
  );
};
