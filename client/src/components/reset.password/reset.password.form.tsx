import React from "react";
import { Resolver, useForm } from "react-hook-form";

type FormValues = {
  password: string;
  repeatPassword: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.password && values.repeatPassword ? values : {},
    errors: !values.password
      ? {
          password: {
            type: "required",
            message: "Password is required",
          },
        }
      : !values.repeatPassword
      ? {
          file: {
            type: "required",
            message: "Repeat your password",
          },
        }
      : values.password.length <= 7
      ? {
          password: {
            type: "onBlur",
            message: "Password length must be 8 characters or more",
          },
        }
      : values.password !== values.repeatPassword
      ? {
          repeatPassword: {
            type: "onBlur",
            message: "Password mismatch",
          },
        }
      : {},
  };
};

type Props = {
  error: string;
  submit: (values: any) => void;
};

export const ResetPasswordForm: React.FC<Props> = ({ error, submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => submit(data));

  return (
    <form onSubmit={onSubmit}>
      <input
        type={"password"}
        placeholder={"New password"}
        {...register("password")}
      />
      {errors?.password ? (
        <p className={"error"}>{errors.password.message}</p>
      ) : (
        <p className={"error"}></p>
      )}

      <input
        type={"password"}
        placeholder={"Repeat password"}
        {...register("repeatPassword")}
      />
      {errors?.repeatPassword ? (
        <p className={"error"}>{errors.repeatPassword.message}</p>
      ) : error ? (
        <p className={"error"}>{error}</p>
      ) : <p className={"error"}></p> ? (
        <p className={"error"}></p>
      ) : (
        <></>
      )}
      <button
        type="submit"
        disabled={!!errors.password && !!errors.repeatPassword}
      >
        Reset password
      </button>
    </form>
  );
};
