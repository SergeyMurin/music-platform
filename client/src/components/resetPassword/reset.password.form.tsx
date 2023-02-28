import React from "react";
import { Resolver, useForm } from "react-hook-form";

enum DisplayedText {
  RESET = "Reset password",
}

enum FormPlaceholders {
  PASSWORD = "New password",
  REPEAT = "Repeat password",
}

enum FormErrors {
  PASSWORD_REQUIRED = "Password is required",
  PASSWORD_NOT_VALID = "Password length must be 8 characters or more",
  REPEAT_PASSWORD_REQUIRED = "Repeat your password",
  PASSWORD_MISMATCH = "Password mismatch",
}

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
        placeholder={FormPlaceholders.REPEAT}
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
        {DisplayedText.RESET}
      </button>
    </form>
  );
};
