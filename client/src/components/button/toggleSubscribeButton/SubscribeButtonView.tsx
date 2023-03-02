import React from "react";
import { IUser } from "../../../types/user";
import { authGuard } from "../../../helpers/helpers";
import { createSubscribeAsync } from "../../../helpers/requests/requests.subscribe";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import subscribeIcon from "../../../assets/user/subscribe-icon.svg";

type Props = {
  user: IUser;
  onToggle: () => void;
};
export const SubscribeButtonView: React.FC<Props> = ({ user, onToggle }) => {
  const { isAuth, token } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();
  const handlerClick = async () => {
    authGuard(isAuth, navigate);
    if (!(token && user)) {
      return;
    }
    try {
      await createSubscribeAsync(user.id, token);
      onToggle();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button>
      <img
        src={subscribeIcon}
        className={"btn_action like subscribe"}
        onClick={handlerClick}
        alt={"subscribe"}
      />
    </button>
  );
};
