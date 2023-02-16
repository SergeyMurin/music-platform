import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { Link } from "react-router-dom";
import { GoogleSignIn } from "../google/google.sign.in";

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values:
      values.email && values.password && values.repeatPassword ? values : {},
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
      : !values.password
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
export const SignUpForm: React.FC<Props> = ({ error, submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => submit(data));

  return (
    <form onSubmit={onSubmit}>
      <input type={"email"} placeholder={"Email"} {...register("email")} />
      {errors?.email ? (
        <p className={"error"}>{errors.email.message}</p>
      ) : (
        <p className={"error"}></p>
      )}

      <input
        type={"password"}
        placeholder={"Password"}
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
        disabled={
          !!errors.email || !!errors.password || !!errors.repeatPassword
        }
      >
        Sign Up
      </button>

      <GoogleSignIn />
    </form>
  );
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
