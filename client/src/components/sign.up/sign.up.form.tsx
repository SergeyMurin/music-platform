// import React, { useState } from "react";
// import { Field, Form, FormikErrors, FormikProps, withFormik } from "formik";
// import axios from "axios";
// import { useActions } from "../../hooks/useActions";
// import { fetchUser } from "../../store/action.creators/user.actions";
// import { Link } from "react-router-dom";
//
// interface FormValues {
//   email: string;
//   password: string;
//   repeatPassword: string;
// }
//
// interface OtherProps {
//   error: string | null;
//   message: string;
// }
//
// const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
//   const { touched, errors, isSubmitting, error } = props;
//
//   return (
//     <Form>
//       <Field type="email" name="email" />
//       {touched.email && errors.email && <div>{errors.email}</div>}
//       <Field type="password" name="password" />
//       {touched.password && errors.password && <div>{errors.password}</div>}
//       <Field type="password" name="repeatPassword" />
//       {touched.repeatPassword && errors.repeatPassword && (
//         <div>{errors.repeatPassword}</div>
//       )}
//       {error && <div>{error}</div>}
//       <Link to={"./forgot"}>Forgot password?</Link>
//       <button type="submit" disabled={!error && !!errors && isSubmitting}>
//         Sign Up
//       </button>
//     </Form>
//   );
// };
//
// interface MyFormProps {
//   error: string | null;
//   onSubmit: (formValues: object) => {};
//   initialEmail?: string;
//   message?: string;
// }
//
// const MyForm = withFormik<MyFormProps, FormValues>({
//   mapPropsToValues: (props) => {
//     return {
//       email: props.initialEmail || "",
//       password: "",
//       repeatPassword: "",
//     };
//   },
//
//   validate: (values: FormValues) => {
//     let errors: FormikErrors<FormValues> = {};
//
//     if (!values.email) {
//       errors.email = "Email address is required";
//     } else if (!validateEmail(values.email)) {
//       errors.email = "Invalid email address";
//     }
//
//     if (!values.password) {
//       errors.password = "Password is required";
//     } else if (!validatePassword(values.password)) {
//       errors.password = "Password length must be 8 characters or more";
//     }
//
//     if (!values.repeatPassword) {
//       errors.repeatPassword = "Repeat your password";
//     } else if (values.repeatPassword !== values.password) {
//       errors.repeatPassword = "Password mismatch";
//     }
//
//     return errors;
//   },
//
//   handleSubmit: async (values, formikBag) => {
//     formikBag.props.onSubmit(values);
//   },
// })(InnerForm);
//
// export const SignUpForm: React.FC = () => {
//   const { fetchUser, setToken, setAuth } = useActions();
//   const [signUpError, setSignUpError] = useState<string | null>(null);
//   const onSubmit = async (values: {}) => {
//     await axios
//       .post("http://localhost:5000/auth/sign-up", {
//         ...values,
//       })
//       .then((response) => {
//         fetchUser(response.data.id);
//         setToken(response.data.token);
//         setAuth(true);
//
//         localStorage.setItem("id", response.data.id);
//         localStorage.setItem("token", response.data.token);
//       })
//       .catch((error) => setSignUpError(error.response.data.message));
//   };
//
//   return (
//     <div>
//       <span>Sign Up</span>
//       <MyForm onSubmit={onSubmit} error={signUpError} />
//     </div>
//   );
// };
//

import React from "react";
import { useForm, Resolver } from "react-hook-form";

//
export const validatePassword = (password: string) => {
  return password.length >= 8;
};

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
      <input type={"email"} {...register("email")} />
      {errors?.email && <p>{errors.email.message}</p>}

      <input type={"text"} {...register("password")} />
      {errors?.password && <p>{errors.password.message}</p>}

      <input type={"text"} {...register("repeatPassword")} />
      {errors?.repeatPassword && <p>{errors.repeatPassword.message}</p>}

      {error && <p>{error}</p>}
      <input type="submit" />
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
