import React from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/user";
import { ClientConfig } from "../../clientConfig";

type Props = {
  user: IUser;
};
export const UserItem: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  const authorClickHandler = () => {
    navigate(`/${ClientConfig.client_routes.profile.index}/${user.id}`);
  };

  return (
    <div className={`track_item fade-in-fwd`}>
      <div className={"track_img"}>
        <img
          src={user.picture_url}
          onClick={authorClickHandler}
          alt={"profile"}
        ></img>
      </div>

      <div className={`track_item_container`}>
        <div className={"info"}>
          <span
            style={{ paddingLeft: "1rem" }}
            className={"fake-link"}
            onClick={authorClickHandler}
          >
            {user?.username}
          </span>
        </div>
      </div>
    </div>
  );
};
