import { IGenre, ITag } from "../../types/track";
import { Option } from "../shared/multi.select";

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

  if (fromSelect) {
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
