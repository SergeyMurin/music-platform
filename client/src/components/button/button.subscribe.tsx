import { IUser } from "../../types/user";
import React, { useEffect, useState } from "react";
import subscribeOnIcon from "../../assets/user/subscribe-on-icon.svg";
import subscribeIcon from "../../assets/user/subscribe-icon.svg";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import axios from "axios";
import {
  createSubscribeAsync,
  removeSubscribeAsync,
} from "../../requests/subscribe";

type Props = {
  user: IUser; //on whom
};

export const ButtonSubscribe: React.FC<Props> = ({ user }) => {
  const { token, isAuth, subscriptions } = useTypedSelector(
    (state) => state.user
  );

  const [isSubscribe, setIsSubscribe] = useState(false);

  useEffect(() => {
    if (subscriptions) {
      const subscriptionId = subscriptions.find((s) => s === user.id);
      if (subscriptionId) {
        setIsSubscribe(true);
      }
    }
  }, []);

  const subscribeAccess = () => {
    if (!isAuth) {
      window.location.replace(window.location.origin + "/sign-in");
    }
  };

  const subscribeButtonHandler = () => {
    subscribeAccess();
    if (token && user) {
      createSubscribeAsync(user.id, token).then(() =>
        setIsSubscribe(!isSubscribe)
      );
    }
  };

  const unsubscribeButtonHandler = () => {
    subscribeAccess();
    if (token && user) {
      removeSubscribeAsync(user.id, token).then(() =>
        setIsSubscribe(!isSubscribe)
      );
    }
  };

  return (
    <>
      {isSubscribe && (
        <img
          src={subscribeOnIcon}
          className={"btn_action like"}
          onClick={unsubscribeButtonHandler}
        />
      )}
      {!isSubscribe && (
        <img
          src={subscribeIcon}
          className={"btn_action like"}
          onClick={subscribeButtonHandler}
        />
      )}
    </>
  );
};
