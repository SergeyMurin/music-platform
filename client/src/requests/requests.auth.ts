import axios from "axios";
import { CredentialResponse } from "@react-oauth/google";
import { ClientConfig } from "../client.config";

export const signInAsync = async (dataValues: any): Promise<any> => {
  return await axios.post(`${ClientConfig.server_uri}/auth/sign-in`, {
    ...dataValues,
  });
};

export const signUpAsync = async (dataValues: any): Promise<any> => {
  return await axios.post(`${ClientConfig.server_uri}/auth/sign-up`, {
    ...dataValues,
  });
};

export const googleSignInAsync = async (
  credentialResponse: CredentialResponse
): Promise<any> => {
  return await axios.post(`${ClientConfig.server_uri}/auth/google`, {
    token: credentialResponse.credential,
  });
};

export const forgotPasswordAsync = async (dataValues: any): Promise<any> => {
  return await axios.post(`${ClientConfig.server_uri}/auth/forgot-password`, {
    ...dataValues,
  });
};

export const resetPasswordAsync = async (dataValues: any, token: string) => {
  await axios.patch(
    `${ClientConfig.server_uri}/auth/reset-password`,
    { password: dataValues?.password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
