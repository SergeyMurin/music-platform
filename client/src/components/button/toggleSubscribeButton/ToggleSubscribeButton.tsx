import { IUser } from "../../../types/user";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { fetchUserSubscriptions } from "../../../store/actionCreators/userActions";
import { UnsubscribeButtonView } from "./UnsubscribeButtonView";
import { SubscribeButtonView } from "./SubscribeButtonView";

type Props = {
  user: IUser;
};

export const ToggleSubscribeButton: React.FC<Props> = ({ user }) => {
  const { subscriptions } = useTypedSelector((state) => state.user);

  const [toggle, setToggle] = useState(false);

  const effectSubscriptions = () => {
    if (subscriptions) {
      const subscriptionId = subscriptions.find((s: any) => s.id === user.id);
      if (subscriptionId) {
        setToggle(true);
      } else setToggle(false);
    }
  };
  useEffect(effectSubscriptions, [subscriptions]);

  const handlerToggle = () => {
    if (!user) {
      return;
    }
    fetchUserSubscriptions(user.id);
    setToggle(!toggle);
  };

  return (
    <>
      {toggle ? (
        <UnsubscribeButtonView user={user} onToggle={handlerToggle} />
      ) : (
        <SubscribeButtonView user={user} onToggle={handlerToggle} />
      )}
    </>
  );
};
