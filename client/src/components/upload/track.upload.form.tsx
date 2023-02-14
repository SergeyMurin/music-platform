import React, { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Select from "react-select/base";
import { IGenre, ITag } from "../../types/track";
import MultiSelect, { Option } from "../shared/multi.select";

type FormValues = {
  title: string;
  picture: File[];
  track: File[];
  lyrics: string;
  explicit: boolean;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: "Title is required.",
          },
        }
      : !values?.picture[0]
      ? {
          picture: {
            type: "required",
            message: "Picture is required",
          },
        }
      : !values?.picture[0]?.type?.startsWith("image/")
      ? {
          picture: {
            type: "onChange",
            message: "Invalid type of picture",
          },
        }
      : !values?.track[0]
      ? {
          track: {
            type: "required",
            message: "Track is required",
          },
        }
      : !values?.track[0]?.type?.startsWith("audio/")
      ? {
          track: {
            type: "onChange",
            message: "Invalid type of track",
          },
        }
      : {},
  };
};

const genresLimit = 5;
const tagsLimit = 10;

type Props = {
  error: string;
  onsubmit: (dataValues: any) => void;
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
  const [tagOptionSelected, setTagSelected] = useState<Option[] | any | null>(
    null
  );
  const [tagError, setTagError] = useState<boolean>(false);

  const handleTagChange = (selected: Option[] | any) => {
    if (selected.length <= tagsLimit) {
      setTagSelected(selected);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

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
    <form onSubmit={onSubmit}>
      {/*TITLE*/}
      <label>Title: </label>
      <input type={"text"} {...register("title")} />
      {errors?.title && <p>{errors.title.message}</p>}

      {/*PICTURE*/}

      <label>Soundtrack picture: </label>
      <input type={"file"} {...register("picture")} />
      {errors?.picture && <p>{errors.picture.message}</p>}

      {/*TRACK*/}
      <label>Soundtrack: </label>
      <input type={"file"} {...register("track")} />
      {errors?.track && <p>{errors.track.message}</p>}

      {/*GENRES*/}
      <label>Genres: </label>
      <article>Genres limit: {genresLimit}</article>
      <MultiSelect
        key="genre"
        options={generateGenreOptions(genres)}
        onChange={handleGenreChange}
        value={genreOptionSelected}
        isSelectAll={true}
        menuPlacement={"bottom"}
      />
      {genreError && <p>Genre is required</p>}

      {/*TAGS*/}

      <label>Tags:</label>
      <MultiSelect
        key="tag"
        options={generateTagOptions(tags)}
        onChange={handleTagChange}
        value={tagOptionSelected}
        isSelectAll={true}
        menuPlacement={"bottom"}
      />

      {/*NEW TAGS*/}

      <label>New tags: {newTags && newTags.map((nt: any) => `#${nt} `)}</label>
      <button
        onClick={(e) => {
          e.preventDefault();
          setNewTags([]);
          setNewTagInputValue("");
        }}
      >
        Clear
      </button>
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
        Add
      </button>
      <article>
        (Optional) Select tags or add new tags using commas. Example:tag1,tag2.
        Tags limit from select bar: {tagsLimit}
      </article>

      {/*EXPLICIT*/}
      <label>Explicit</label>
      <input type={"checkbox"} {...register("explicit")} />

      {/*LYRICS*/}
      <textarea {...register("lyrics")} />

      {error && <p>{error}</p>}
      {success && <p>Success</p>}
      <button
        type="submit"
        disabled={
          !!errors.track || !!errors.picture || !!errors.title || genreError
        }
      >
        Upload track
      </button>
    </form>
  );
};

export const generateGenreOptions = (genres: IGenre[] | null) => {
  if (!genres) {
    return [];
  }
  return genres.map((genre) => {
    return {
      value: genre.id,
      label: genre.title,
    };
  });
};

export const generateTagOptions = (tags: ITag[] | null) => {
  if (!tags) {
    return [];
  }
  return tags.map((tag) => {
    return {
      value: tag.title,
      label: `#${tag.title} - ${tag.amount}`,
    };
  });
};

export const formatTags = (fromSelect: Option[], newTags: any, limit = 10) => {
  let output = "";
  let count = 0;

  for (const tagSelect of fromSelect) {
    if (count > limit) {
      output = output.replace(/\s+/g, ",").replace(/,+/g, ",").trim();
      if (output.endsWith(",")) {
        output = output.slice(0, -1);
      }
      return output;
    }
    output += (tagSelect.value as string) + " ";
    count++;
  }

  for (const newTag of newTags) {
    if (count > limit) {
      output = output.replace(/\s+/g, ",").replace(/,+/g, ",").trim();
      if (output.endsWith(",")) {
        output = output.slice(0, -1);
      }
      return output;
    }
    output += newTag + " ";
    count++;
  }
  output = output.replace(/\s+/g, ",").replace(/,+/g, ",").trim();
  if (output.endsWith(",")) {
    output = output.slice(0, -1);
  }
  return output;
};

export const formatGenres = (fromSelect: Option[] | null) => {
  let output = "";
  fromSelect?.map((genre) => (output += genre.value + " "));
  output = output.replace(/\s+/g, ",").replace(/,+/g, ",").trim();
  if (output.endsWith(",")) {
    output = output.slice(0, -1);
  }
  return output;
};
