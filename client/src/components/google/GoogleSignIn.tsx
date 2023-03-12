import React from "react";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useActions } from "../../hooks/useActions";
import { ClientConfig } from "../../clientConfig";
import { googleSignInAsync } from "../../helpers/requests/authRequests";

export const GoogleSignIn: React.FC = () => {
  const { setAuth, setToken, fetchUser } = useActions();

  const handlerSuccessAsync = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const response = await googleSignInAsync(credentialResponse);
      setAuth(true);
      fetchUser(response.data.id);
      setToken(response.data.token);

      localStorage.setItem(ClientConfig.local.id, response.data.id);
      localStorage.setItem(ClientConfig.local.token, response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={"google_auth"}>
      <GoogleOAuthProvider clientId={ClientConfig.google_client_id}>
        <GoogleLogin
          useOneTap
          onSuccess={async (credentialResponse) =>
            handlerSuccessAsync(credentialResponse)
          }
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};
