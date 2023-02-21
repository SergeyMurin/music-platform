import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useActions } from "../../hooks/useActions";
import { fetchUser } from "../../store/action.creators/user.actions";
import { Constants } from "../../constants";
import { googleSignInAsync } from "../../requests/auth";

export const GoogleSignIn: React.FC = () => {
  const { setAuth, setToken, fetchUser } = useActions();
  return (
    <div className={"google_auth"}>
      <GoogleOAuthProvider clientId={Constants.google_client_id}>
        <GoogleLogin
          useOneTap
          onSuccess={async (credentialResponse) => {
            googleSignInAsync(credentialResponse).then((response) => {
              setAuth(true);
              fetchUser(response.data.id);
              setToken(response.data.token);

              localStorage.setItem(Constants.local.id, response.data.id);
              localStorage.setItem(Constants.local.token, response.data.token);
            });
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};
