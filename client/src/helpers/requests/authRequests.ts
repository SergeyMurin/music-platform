import axios, { AxiosResponse } from "axios";
import { CredentialResponse } from "@react-oauth/google";
import { ClientConfig } from "../../clientConfig";
import { IForgotPasswordDataValues } from "../../components/forgotPassword/ForgotPassword";
import { ISignUpFormValues } from "../../components/signUp/SignUp";
import { ISignInFormValues } from "../../components/signIn/SignIn";
import { IResetPasswordFormValues } from "../../components/resetPassword/ResetPassword";

export const signInAsync = async (
  dataValues: ISignInFormValues
): Promise<AxiosResponse> => {
  return await axios.post(`${ClientConfig.server_uri}/auth/sign-in`, {
    ...dataValues,
  });
};

export const signUpAsync = async (
  dataValues: ISignUpFormValues
): Promise<AxiosResponse> => {
  return await axios.post(`${ClientConfig.server_uri}/auth/sign-up`, {
    ...dataValues,
  });
};

export const googleSignInAsync = async (
  credentialResponse: CredentialResponse
): Promise<AxiosResponse> => {
  return await axios.post(`${ClientConfig.server_uri}/auth/google`, {
    token: credentialResponse.credential,
  });
};

export const forgotPasswordAsync = async (
  dataValues: IForgotPasswordDataValues
): Promise<AxiosResponse> => {
  return await axios.post(`${ClientConfig.server_uri}/auth/forgot-password`, {
    ...dataValues,
  });
};

export const resetPasswordAsync = async (
  dataValues: IResetPasswordFormValues,
  token: string
): Promise<AxiosResponse> => {
  return await axios.patch(
    `${ClientConfig.server_uri}/auth/reset-password`,
    { password: dataValues?.password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const confirmEmailAsync = async (
  token: string
): Promise<AxiosResponse> => {
  return await axios.get(`${ClientConfig.server_uri}/auth/confirm`, {
    params: { token },
  });
};
