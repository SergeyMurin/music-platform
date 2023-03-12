import React, { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MultiSelect, { Option } from "../shared/MultiSelect";

import {
  formatGenres,
  formatTags,
  generateGenreOptions,
  generateTagOptions,
} from "./utilities";
import { IUploadTrackFormValues } from "./TrackUpload";

enum DisplayedText {
  TAGS = "(Optional) Select tags or add new tags using. Example:tag1,tag2. Tags limit from select bar:",
  ADD = "Add",
  CLEAR = "Clear",
  SUCCESS = "Success",
  UPLOAD = "Upload track",
}

enum FormLabels {
  TITLE = "Title: ",
  PICTURE = "Soundtrack picture: ",
  TRACK = "Soundtrack: ",
  GENRES = "Genres: ",
  TAGS = "Tags:",
  NEW_TAGS = "New tags: ",
  EXPLICIT = "Explicit:",
  LYRICS = "Lyrics:",
}

enum FormFileTypes {
  IMAGE = "image/",
  AUDIO = "audio/",
}

enum FormErrors {
  TITLE_REQUIRED = "Title is required",
  PICTURE_REQUIRED = "Picture is required",
  PICTURE_NOT_VALID = "Invalid type of picture",
  TRACK_REQUIRED = "Track is required",
  TRACK_NOT_VALID = "Invalid type of track",

  GENRE_REQUIRED = "Genre is required",
}

const resolver: Resolver<IUploadTrackFormValues> = async (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: FormErrors.TITLE_REQUIRED,
          },
        }
      : !values?.picture[0]
      ? {
          picture: {
            type: "required",
            message: FormErrors.PICTURE_REQUIRED,
          },
        }
      : !values?.picture[0]?.type?.startsWith(FormFileTypes.IMAGE)
      ? {
          picture: {
            type: "onChange",
            message: FormErrors.PICTURE_NOT_VALID,
          },
        }
      : !values?.track[0]
      ? {
          track: {
            type: "required",
            message: FormErrors.TRACK_REQUIRED,
          },
        }
      : !values?.track[0]?.type?.startsWith(FormFileTypes.AUDIO)
      ? {
          track: {
            type: "onChange",
            message: FormErrors.TRACK_NOT_VALID,
          },
        }
      : {},
  };
};

const genresLimit = 5;
const tagsLimit = 10;

type Props = {
  error: string;
  onsubmit: (dataValues: IUploadTrackFormValues) => void;
  success: boolean;
};
export const TrackUploadForm: React.FC<Props> = ({
  error,
  onsubmit,
  success,
}) => {
  const { genres, tags } = useTypedSelector((state) => state.track);
  const [genreOptionSelected, setGenreSelected] = useState<Option[] | null>(
    null
  );
  const [genreError, setGenreError] = useState<boolean>(false);

  const handleGenreChange = (selected: Option[]) => {
    if (selected.length <= genresLimit) {
      setGenreSelected(selected);
    }
  };

  const [newTags, setNewTags] = useState<string[]>([]);
  const [newTagInputValue, setNewTagInputValue] = useState("");
  const [tagOptionSelected, setTagSelected] = useState<Option[] | null>(null);
  const [, setTagError] = useState<boolean>(false);

  const handleTagChange = (selected: Option[]) => {
    if (selected.length <= tagsLimit) {
      setTagSelected(selected);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUploadTrackFormValues>({ resolver });

  const onSubmit = handleSubmit((data) => {
    if (!tagOptionSelected) {
      setTagError(true);
    } else setTagError(false);

    if (!genreOptionSelected) {
      setGenreError(true);
    } else setGenreError(false);

    const dataValues = {
      ...data,
      explicit: data.explicit.toString(),
      tags: formatTags(tagOptionSelected, newTags),
      genres: formatGenres(genreOptionSelected),
    };

    onsubmit(dataValues);
  });

  return (
    <form className={"track-upload-form"} onSubmit={onSubmit}>
      {/*TITLE*/}
      <div className={"form-row"}>
        <label>{FormLabels.TITLE}</label>
        <input type={"text"} {...register("title")} />
        {errors?.title ? (
          <p className={"error"}>{errors.title.message}</p>
        ) : (
          <p className={"error"}></p>
        )}
      </div>

      <div className={"form-row"}>
        {/*PICTURE*/}
        <label>{FormLabels.PICTURE}</label>
        <input type={"file"} {...register("picture")} />
        {errors?.picture ? (
          <p>{errors.picture.message}</p>
        ) : (
          <p className={"error"}></p>
        )}
      </div>
      <div className={"form-row"}>
        {/*TRACK*/}
        <label>{FormLabels.TRACK}</label>
        <input type={"file"} {...register("track")} />
        {errors?.track ? (
          <p className={"error"}>{errors.track.message}</p>
        ) : (
          <p className={"error"}></p>
        )}
      </div>

      {/*GENRES*/}
      <div className={"form-row"}>
        <label>
          {FormLabels.GENRES}(Limit {genresLimit}){" "}
        </label>
        <MultiSelect
          key="genre"
          options={generateGenreOptions(genres)}
          onChange={handleGenreChange}
          value={genreOptionSelected}
          isSelectAll={true}
          menuPlacement={"bottom"}
        />
        {genreError ? (
          <p className={"error"}>{FormErrors.GENRE_REQUIRED}</p>
        ) : (
          <p className={"error"}></p>
        )}
      </div>

      {/*TAGS*/}

      <article>
        {DisplayedText.TAGS}
        {tagsLimit}
      </article>
      <div className={"form-row"}>
        <label>{FormLabels.TAGS}</label>
        <MultiSelect
          key="tag"
          options={generateTagOptions(tags)}
          onChange={handleTagChange}
          value={tagOptionSelected}
          isSelectAll={true}
          menuPlacement={"bottom"}
        />
      </div>
      <div className={"form-row"}>
        {/*NEW TAGS*/}

        <label>
          {FormLabels.NEW_TAGS}
          {newTags && newTags.map((nt: string) => `#${nt} `)}
        </label>
      </div>
      <div className={"form-row"}>
        <input
          type={"text"}
          value={newTagInputValue}
          onChange={(e) => setNewTagInputValue(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            const tags = newTags;
            if (tags.find((t) => t === newTagInputValue)) {
              return;
            }
            tags.push(newTagInputValue);
            setNewTags(tags);
            setNewTagInputValue("");
          }}
        >
          {DisplayedText.ADD}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setNewTags([]);
            setNewTagInputValue("");
          }}
        >
          {DisplayedText.CLEAR}
        </button>
      </div>

      <div className={"form-row"}>
        {/*EXPLICIT*/}
        <label>{FormLabels.EXPLICIT}</label>
        <input type={"checkbox"} {...register("explicit")} />

        {/*LYRICS*/}
        <label>{FormLabels.LYRICS}</label>

        <textarea {...register("lyrics")} />
      </div>

      {error && <p>{error}</p>}
      {success && <p>{DisplayedText.SUCCESS}</p>}
      <button
        type="submit"
        disabled={
          !!errors.track || !!errors.picture || !!errors.title || genreError
        }
      >
        {DisplayedText.UPLOAD}
      </button>
    </form>
  );
};
