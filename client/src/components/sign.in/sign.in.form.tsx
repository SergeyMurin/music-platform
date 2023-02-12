import React, { useState } from "react";
import { Field, Form, FormikErrors, FormikProps, withFormik } from "formik";
import { useActions } from "../../hooks/useActions";
import axios from "axios";

interface FormValues {
  email: string;
  password: string;
}

interface OtherProps {
  error: string | null;
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;

  return (
    <Form>
      <Field type="email" name="email" />
      {touched.email && errors.email && <div>{errors.email}</div>}
      <Field type="password" name="password" />
      {touched.password && errors.password && <div>{errors.password}</div>}
      <button type="submit" disabled={isSubmitting}>
        Sign In
      </button>
    </Form>
  );
};

interface MyFormProps {
  error: string | null;
  onSubmit: (formValues: object) => {};
  initialEmail?: string;
  message?: string;
}

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || "",
      password: "",
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.email) {
      errors.email = "Password is required";
    } else if (!validateEmail(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.email = "Password is required";
    }

    return errors;
  },

  handleSubmit: (values, formikBag) => {
    formikBag.props.onSubmit(values);
  },
})(InnerForm);

export const SignInForm: React.FC = () => {
  const { fetchUser, setToken, setAuth } = useActions();
  const [signInError, setSignInError] = useState<string | null>(null);

  const onSubmit = async (values: {}) => {
    await axios
      .post("http://localhost:5000/auth/sign-in", {
        ...values,
      })
      .then((response) => {
        fetchUser(response.data.id);
        setToken(response.data.token);
        setAuth(true);

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => setSignInError(error.response.data.message));
  };

  return (
    <div>
      <span>Sign In</span>
      <MyForm onSubmit={onSubmit} error={signInError} />
    </div>
  );
};

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
