import axios from "axios";
import { CredentialResponse } from "@react-oauth/google";

export const signInAsync = async (dataValues: any): Promise<any> => {
  return await axios.post("http://localhost:5000/auth/sign-in", {
    ...dataValues,
  });
};

export const signUpAsync = async (dataValues: any): Promise<any> => {
  return await axios.post("http://localhost:5000/auth/sign-up", {
    ...dataValues,
  });
};

export const googleSignInAsync = async (
  credentialResponse: CredentialResponse
): Promise<any> => {
  return await axios.post("http://localhost:5000/auth/google", {
    token: credentialResponse.credential,
  });
};

export const forgotPasswordAsync = async (dataValues: any): Promise<any> => {
  return await axios.post("http://localhost:5000/auth/forgot-password", {
    ...dataValues,
  });
};

export const resetPasswordAsync = async (dataValues: any, token: string) => {
  await axios.patch(
    "http://localhost:5000/auth/reset-password",
    { password: dataValues?.password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
