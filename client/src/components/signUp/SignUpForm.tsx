import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { GoogleSignIn } from "../google/GoogleSignIn";
import { ISignUpFormValues } from "./SignUp";

enum DisplayedText {
  SIGN_UP = "Sign Up",
}

enum FormPlaceholders {
  EMAIL = "Email",
  PASSWORD = "Password",
  REPEAT_PASSWORD = "Repeat password",
}

enum FormErrors {
  EMAIL_REQUIRED = "Email is required",
  EMAIL_NOT_VALID = "Email not valid",
  PASSWORD_REQUIRED = "Password is required",
  PASSWORD_NOT_VALID = "Password length must be 8 characters or more",
  REPEAT_PASSWORD_REQUIRED = "Repeat your password",
  PASSWORD_MISMATCH = "Password mismatch",
}

const resolver: Resolver<ISignUpFormValues> = async (values) => {
  return {
    values:
      values.email && values.password && values.repeatPassword ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: FormErrors.EMAIL_REQUIRED,
          },
        }
      : !validateEmail(values.email)
      ? {
          email: {
            type: "onBlur",
            message: FormErrors.EMAIL_NOT_VALID,
          },
        }
      : !values.password
      ? {
          password: {
            type: "required",
            message: FormErrors.PASSWORD_REQUIRED,
          },
        }
      : !values.repeatPassword
      ? {
          file: {
            type: "required",
            message: FormErrors.REPEAT_PASSWORD_REQUIRED,
          },
        }
      : values.password.length <= 7
      ? {
          password: {
            type: "onBlur",
            message: FormErrors.PASSWORD_NOT_VALID,
          },
        }
      : values.password !== values.repeatPassword
      ? {
          repeatPassword: {
            type: "onBlur",
            message: FormErrors.PASSWORD_MISMATCH,
          },
        }
      : {},
  };
};

type Props = {
  error: string;
  submit: (values: ISignUpFormValues) => void;
};
export const SignUpForm: React.FC<Props> = ({ error, submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormValues>({ resolver });
  const onSubmit = handleSubmit((data) => submit(data));

  return (
    <form onSubmit={onSubmit}>
      <input
        type={"email"}
        placeholder={FormPlaceholders.EMAIL}
        {...register("email")}
      />
      {errors?.email ? (
        <p className={"error"}>{errors.email.message}</p>
      ) : (
        <p className={"error"}></p>
      )}

      <input
        type={"password"}
        placeholder={FormPlaceholders.PASSWORD}
        {...register("password")}
      />
      {errors?.password ? (
        <p className={"error"}>{errors.password.message}</p>
      ) : (
        <p className={"error"}></p>
      )}

      <input
        type={"password"}
        placeholder={FormPlaceholders.REPEAT_PASSWORD}
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
        {DisplayedText.SIGN_UP}
      </button>

      <GoogleSignIn />
    </form>
  );
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
