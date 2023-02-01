import React from "react";
import "./App.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useStore } from "./hooks/useStore";

function App() {
  const { authData } = useStore();

  const setAuthData = useStore((state: any) => state.setAuthData);
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="836445093751-38eejskvs0dioadp0sstf09j8tphasqo.apps.googleusercontent.com">
        <div>
          <GoogleLogin
            useOneTap
            onSuccess={async (credentialResponse) => {
              const response = await axios.post(
                "http://localhost:5000/user/auth/google",
                {
                  token: credentialResponse.credential,
                }
              );
              const data = response.data;

              localStorage.setItem("authData", JSON.stringify(data));
              setAuthData(data);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
