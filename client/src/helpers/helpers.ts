import { ClientConfig } from "../client.config";
import { NavigateFunction } from "react-router-dom";

export const getLocalToken = () => {
  return localStorage.getItem(ClientConfig.local.token);
};

export const authorizationFieldWithLocalToken = () => {
  const token = getLocalToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export const createBlob = (data: [], blobType: string): Blob => {
  const byteArray = new Uint8Array(data);
  return new Blob([byteArray], { type: blobType });
};

export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
};

export const authGuard = (isAuth: boolean, navigate: NavigateFunction) => {
  if (!isAuth) {
    navigate(`/${ClientConfig.client_routes.auth.sign_in}`);
  }
};
