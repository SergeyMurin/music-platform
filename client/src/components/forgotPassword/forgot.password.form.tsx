import React from "react";
import { Resolver, useForm } from "react-hook-form";
import { validateEmail } from "../sign.up/sign.up.form";

type FormValues = {
  email: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "Email is required",
          },
        }
      : !validateEmail(values.email)
      ? {
          email: {
            type: "onBlur",
            message: "Email not valid",
          },
        }
      : {},
  };
};

type Props = {
  error: string;
  submit: (values: any) => void;
};
export const ForgotPasswordForm: React.FC<Props> = ({ error, submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => submit(data));
  return (
    <form onSubmit={onSubmit}>
      <input type={"email"} {...register("email")} />
      {errors?.email ? (
        <p className={"error"}>{errors.email.message}</p>
      ) : error ? (
        <p className={"error"}>{error}</p>
      ) : <p className={"error"}></p> ? (
        <p className={"error"}></p>
      ) : (
        <></>
      )}

      <button type="submit" disabled={!!errors.email}>
        Send email
      </button>
    </form>
  );
};
