import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useActions } from "../../hooks/useActions";
import { fetchUser } from "../../store/action.creators/user.actions";

export const GoogleSignIn: React.FC = () => {
  const { setAuth, setToken, fetchUser } = useActions();
  return (
    <GoogleOAuthProvider clientId="836445093751-38eejskvs0dioadp0sstf09j8tphasqo.apps.googleusercontent.com">
      <div>
        <GoogleLogin
          useOneTap
          onSuccess={async (credentialResponse) => {
            await axios
              .post("http://localhost:5000/auth/google", {
                token: credentialResponse.credential,
              })
              .then((response) => {
                setAuth(true);
                fetchUser(response.data.id);
                setToken(response.data.token);

                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token", response.data.token);
              });
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};
