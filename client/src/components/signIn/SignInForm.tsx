import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { Link } from "react-router-dom";
import { validateEmail } from "../signUp/SignUpForm";
import { GoogleSignIn } from "../google/GoogleSignIn";
import { ClientConfig } from "../../clientConfig";

enum DisplayedText {
  FORGOT_PASSWORD = "Forgot password?",
  SIGN_IN = "Sign In",
}

enum FormPlaceholders {
  EMAIL = "Email",
  PASSWORD = "Password",
}

enum FormErrors {
  EMAIL_REQUIRED = "Email is required",
  EMAIL_NOT_VALID = "Email not valid",
  PASSWORD_REQUIRED = "Password is required",
}

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email && values.password ? values : {},
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
            type: "onChange",
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
      : {},
  };
};

type Props = {
  error: string;
  submit: (values: any) => void;
};
export const SignInForm: React.FC<Props> = ({ error, submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
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
      ) : error ? (
        <p className={"error"}>{error}</p>
      ) : <p className={"error"}></p> ? (
        <p className={"error"}></p>
      ) : (
        <></>
      )}

      <button type="submit" disabled={!!errors.email || !!errors.password}>
        {DisplayedText.SIGN_IN}
      </button>

      <Link to={`../${ClientConfig.client_routes.auth.password_forgot}`}>
        {DisplayedText.FORGOT_PASSWORD}
      </Link>
      <GoogleSignIn />
    </form>
  );
};
