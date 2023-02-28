import React, { useEffect, useState } from "react";
import { TrackUploadForm } from "./track.upload.form";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import "./upload.css";
import { uploadTrackAsync } from "../../helpers/requests/request.upload";

enum DisplayedText {
  HEADER = "Soundtrack upload form",
}

enum FormDataFields {
  TRACK = "track",
  PICTURE = "picture",
  TITLE = "title",
  LYRICS = "lyrics",
  TAGS = "tags",
  GENRES = "genres",
  EXPLICIT = "explicit",
}

export const TrackUpload: React.FC = () => {
  const [uploadTrackError, setUploadTrackError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { token } = useTypedSelector((state) => state.user);
  const { fetchTags, fetchGenres } = useActions();

  useEffect(() => {
    fetchTags();
    fetchGenres();
  }, [fetchGenres, fetchTags]);
  const onSubmit = (dataValues: any) => {
    trackUpload(dataValues).then();
  };

  const trackUpload = async (dataValues: any) => {
    const formData = new FormData();

    formData.append(FormDataFields.TRACK, dataValues.track[0]);
    formData.append(FormDataFields.PICTURE, dataValues.picture[0]);
    formData.append(FormDataFields.TITLE, dataValues.title);
    formData.append(FormDataFields.LYRICS, dataValues.lyrics);
    formData.append(FormDataFields.TAGS, dataValues.tags);
    formData.append(FormDataFields.GENRES, dataValues.genres);
    formData.append(FormDataFields.EXPLICIT, dataValues.explicit);

    if (!token) {
      return;
    }

    uploadTrackAsync(formData, token)
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
      <h1>{DisplayedText.HEADER}</h1>
      <hr />
      <TrackUploadForm
        onsubmit={onSubmit}
        error={uploadTrackError}
        success={uploadSuccess}
      />
    </div>
  );
};
