import { IUser } from "../../types/user";
import React, { useEffect, useState } from "react";
import subscribeOnIcon from "../../assets/user/subscribe-on-icon.svg";
import subscribeIcon from "../../assets/user/subscribe-icon.svg";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  createSubscribeAsync,
  removeSubscribeAsync,
} from "../../helpers/requests/requests.subscribe";
import { authGuard } from "../../helpers/helpers";

type Props = {
  user: IUser;
};

export const ButtonSubscribe: React.FC<Props> = ({ user }) => {
  const { token, isAuth, subscriptions } = useTypedSelector(
    (state) => state.user
  );

  const [isSubscribe, setIsSubscribe] = useState(false);

  useEffect(() => {
    if (subscriptions) {
      const subscriptionId = subscriptions.find((s: any) => s.id === user.id);
      if (subscriptionId) {
        setIsSubscribe(true);
      }
    }
  }, [user, subscriptions]);

  const handlerAsyncSubscribeButton = async () => {
    authGuard(isAuth);
    if (token && user) {
      createSubscribeAsync(user.id, token).then(() =>
        setIsSubscribe(!isSubscribe)
      );
    }
  };

  const handlerUnsubscribeButton = () => {
    authGuard(isAuth);
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
          className={"btn_action like subscribe"}
          onClick={handlerUnsubscribeButton}
          alt={"unsubscribe"}
        />
      )}
      {!isSubscribe && (
        <img
          src={subscribeIcon}
          className={"btn_action like subscribe"}
          onClick={handlerAsyncSubscribeButton}
          alt={"subscribe"}
        />
      )}
    </>
  );
};
