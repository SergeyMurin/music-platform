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
  genre: [];
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
          picture: {
            type: "required",
            message: "Picture is required",
          },
        }
      : !values?.track[0]?.type?.startsWith("audio/")
      ? {
          picture: {
            type: "onChange",
            message: "Invalid type of picture",
          },
        }
      : !values.genre
      ? {
          genre: {
            type: "required",
            message: "Genre is required",
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
};
export const TrackUploadForm: React.FC<Props> = ({ error, onsubmit }) => {
  const { genres, tags } = useTypedSelector((state) => state.track);
  const [genreOptionSelected, setGenreSelected] = useState<Option[] | null>(
    null
  );
  const handleGenreChange = (selected: Option[]) => {
    if (selected.length <= genresLimit) {
      setGenreSelected(selected);
    }
  };

  const [tagOptionSelected, setTagSelected] = useState<Option[] | null>(null);
  const handleTagChange = (selected: Option[]) => {
    if (selected.length <= tagsLimit) {
      setTagSelected(selected);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <input type={"text"} {...register("title")} />
      {errors?.title && <p>{errors.title.message}</p>}

      <MultiSelect
        key="genre"
        options={generateGenreOptions(genres)}
        onChange={handleGenreChange}
        value={genreOptionSelected}
        isSelectAll={true}
        menuPlacement={"bottom"}
      />
      {errors?.genre && <p>{errors.genre.message}</p>}

      <MultiSelect
        key="tag"
        options={generateTagOptions(tags)}
        onChange={handleTagChange}
        value={tagOptionSelected}
        isSelectAll={true}
        menuPlacement={"bottom"}
      />

      <input type={"file"} {...register("picture")} />
      {errors?.picture && <p>{errors.picture.message}</p>}

      <input type={"file"} {...register("track")} />
      {errors?.track && <p>{errors.track.message}</p>}

      <input
        type="submit"
        disabled={!!errors.track || !!errors.picture || !!errors.title}
      />
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
      value: tag.id,
      label: `#${tag.title} - ${tag.amount}`,
    };
  });
};
