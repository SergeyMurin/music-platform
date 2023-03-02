import React from "react";
import { authGuard } from "../../../helpers/helpers";
import { removeSubscribeAsync } from "../../../helpers/requests/subscribeRequests";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../types/user";
import subscribeOnIcon from "../../../assets/user/subscribe-on-icon.svg";

type Props = {
  user: IUser;
  onToggle: () => void;
};
export const UnsubscribeButtonView: React.FC<Props> = ({ user, onToggle }) => {
  const { isAuth, token } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();
  const handlerClick = async () => {
    authGuard(isAuth, navigate);
    if (!(token && user)) {
      return;
    }

    try {
      await removeSubscribeAsync(user.id, token);
      onToggle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button>
      <img
        src={subscribeOnIcon}
        className={"btn_action like subscribe"}
        onClick={handlerClick}
        alt={"unsubscribe"}
      />
    </button>
  );
};
