import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

export const EmailConfirmPage: React.FC = () => {
  const { user, isAuth } = useTypedSelector((state) => state.user);
  const { fetchUser } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const token: string | null = searchParams.get("token");
    if (token && !user?.email_confirmed) {
      confirmEmail(token).then();
    }
  }, [searchParams]);

  const confirmEmail = async (token: string) => {
    await axios
      .get("http://localhost:5000/auth/confirm", {
        params: { token },
      })
      .then(() => {
        fetchUser(user?.id as string);
      })
      .catch((e) => console.error(e));
  };
  return (
    <div>
      {isAuth && user?.email_confirmed && (
        <div>
          <div>Email confirmed</div>
          <Link to={"../"} replace={true}>
            To home
          </Link>
        </div>
      )}
      {isAuth && !user?.email_confirmed && <div>Confirming email...</div>}
    </div>
  );
};
