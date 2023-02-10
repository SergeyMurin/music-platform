import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

export const SignUp: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId="836445093751-38eejskvs0dioadp0sstf09j8tphasqo.apps.googleusercontent.com">
      <div>
        <GoogleLogin
          useOneTap
          onSuccess={async (credentialResponse) => {
            const response = await axios.post(
              "http://localhost:5000/auth/google",
              {
                token: credentialResponse.credential,
              }
            );
            const data = response.data;
            console.log(data);

            localStorage.setItem("authData", JSON.stringify(data));
            //setAuthData(data);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};
