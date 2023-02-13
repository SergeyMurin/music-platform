import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { Link } from "react-router-dom";
import { validateEmail } from "../sign.up/sign.up.form";

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
      <input type={"email"} {...register("email")} />
      {errors?.email && <p>{errors.email.message}</p>}

      <input type={"password"} {...register("password")} />
      {errors?.password && <p>{errors.password.message}</p>}

      {error && <p>{error}</p>}
      <Link to={"../password/forgot"}>Forgot password?</Link>

      <button type="submit" disabled={!!errors.email || !!errors.password}>
        Sign In
      </button>
    </form>
  );
};
