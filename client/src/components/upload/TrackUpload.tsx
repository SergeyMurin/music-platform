import React, { useEffect, useState } from "react";
import { TrackUploadForm } from "./TrackUploadForm";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import "./Upload.css";
import { uploadTrackAsync } from "../../helpers/requests/uploadRequests";

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

export interface IUploadTrackFormValues {
  title: string;
  picture: File[];
  track: File[];
  lyrics: string;
  explicit: boolean | string;
  tags: string;
  genres: string;
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
  const onSubmit = async (dataValues: IUploadTrackFormValues) => {
    await trackUpload(dataValues);
  };

  const trackUpload = async (dataValues: IUploadTrackFormValues) => {
    const formData = new FormData();

    formData.append(FormDataFields.TRACK, dataValues.track[0]);
    formData.append(FormDataFields.PICTURE, dataValues.picture[0]);
    formData.append(FormDataFields.TITLE, dataValues.title);
    formData.append(FormDataFields.LYRICS, dataValues.lyrics);
    formData.append(FormDataFields.TAGS, dataValues.tags);
    formData.append(FormDataFields.GENRES, dataValues.genres);
    formData.append(FormDataFields.EXPLICIT, dataValues.explicit as string);

    if (!token) return;

    const response = await uploadTrackAsync(formData, token).catch((error) =>
      setUploadTrackError(error?.response?.data.message)
    );
    if (response && response.status >= 200 && response.status <= 299) {
      setUploadSuccess(true);
    }
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
