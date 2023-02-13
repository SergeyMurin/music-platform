import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Field, Form, FormikErrors, FormikProps, withFormik } from "formik";
import { validatePassword } from "../components/sign.up/sign.up.form";
import axios from "axios";

interface FormValues {
  password: string;
  repeatPassword: string;
}

interface OtherProps {
  error: string | null;
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, validateOnChange, error } = props;

  return (
    <Form>
      <Field type="password" name="password" />
      {touched.password && errors.password && <div>{errors.password}</div>}
      <Field type="password" name="repeatPassword" />
      {touched.repeatPassword && errors.repeatPassword && (
        <div>{errors.repeatPassword}</div>
      )}
      {error && <div>{error}</div>}
      <button type="submit" disabled={isSubmitting}>
        Reset password
      </button>
    </Form>
  );
};

interface MyFormProps {
  error: string | null;
  onSubmit: (formValues: FormValues) => void;
  initialEmail?: string;
}

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      password: "",
      repeatPassword: "",
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.password) {
      errors.password = "Password is required";
    } else if (!validatePassword(values.password)) {
      errors.password = "Password length must be 8 characters or more";
    }

    if (!values.repeatPassword) {
      errors.repeatPassword = "Repeat your password";
    } else if (values.repeatPassword !== values.password) {
      errors.repeatPassword = "Password mismatch";
    }

    return errors;
  },

  handleSubmit: async (values, formikBag) => {
    formikBag.props.onSubmit(values);
  },
})(InnerForm);

export const ResetPasswordPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [isReset, setIsReset] = useState(false);

  const onSubmit = (values: FormValues) => {
    const token: string | null = searchParams.get("token");
    if (token) {
      resetPassword(token, values).then();
    }
  };

  const resetPassword = async (token: string, values: FormValues) => {
    await axios
      .patch(
        "http://localhost:5000/auth/reset-password",
        { password: values?.password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsReset(true);
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <>
      <MyForm onSubmit={onSubmit} error={error} />
      {isReset && (
        <div>
          <div>Password has been reset</div>
          <Link to={"../sign-in"}>Sign In</Link>
        </div>
      )}
    </>
  );
};
