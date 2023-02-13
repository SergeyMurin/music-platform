import React from "react";
import { useForm, Resolver } from "react-hook-form";

type FormValues = {
  firstName: string;
  file: File[];
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.file
      ? {
          file: {
            type: "required",
            message: "T",
          },
        }
      : !values.file[0].type?.startsWith("audio/")
      ? {
          file: {
            type: "onChange",
            message: "Invalid type",
          },
        }
      : {},
  };
};

export const TrackUploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <input {...register("firstName")} placeholder="Bill" />
      {errors?.firstName && <p>{errors.firstName.message}</p>}

      <input type={"file"} {...register("file")} />
      {errors?.file && <p>{errors.file.message}</p>}

      <input type="submit" />
    </form>
  );
};
