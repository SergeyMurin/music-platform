/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Field, Form, FormikErrors, FormikProps, withFormik } from "formik";
import { useActions } from "../hooks/useActions";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { validateEmail } from "../components/sign.up/sign.up.form";

interface FormValues {
  email: string;
}

interface OtherProps {
  error?: string | null;
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, validateOnChange, error } = props;

  return (
    <Form>
      <Field type="email" name="email" />
      {touched.email && errors.email && <div>{errors.email}</div>}
      {error && <div>{error}</div>}
      <button type="submit" disabled={isSubmitting}>
        Send email
      </button>
    </Form>
  );
};

interface MyFormProps {
  error?: string | null;
  onSubmit: (formValues: object) => void;
  initialEmail?: string;
}

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || "",
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!validateEmail(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  },

  handleSubmit: async (values, formikBag) => {
    formikBag.props.onSubmit(values);
  },
})(InnerForm);

export const ForgotPasswordPage: React.FC = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (values: {}) => {
    setIsSubmit(true);
    sendResetLink(values).then();
  };

  const sendResetLink = async (values: {}) => {
    await axios
      .post("http://localhost:5000/auth/forgot-password", { ...values })
      .then(() => {
        setIsSent(true);
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <>
      <MyForm onSubmit={onSubmit} error={error} />
      {!isSent && isSubmit && <div>Sending link to your email</div>}{" "}
      {isSent && isSubmit && <div>Reset link has been sent to your email</div>}
    </>
  );
};
*/

import { ForgotPassword } from "../components/forgot.password/forgot.password";
import React from "react";

export const ForgotPasswordPage: React.FC = () => {
  return (
    <>
      <ForgotPassword />
    </>
  );
};
