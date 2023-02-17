import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/user";

type Props = {
  user: IUser;
};
export const UserItem: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, [user]);
  const authorClickHandler = (e: any) => {
    let href = window.location.href;
    href = href
      .split("/")
      [href.split("/").length - 1].split("?")[0]
      .split(" ")[0];
    if (href === "search") {
      navigate(`../profile/${user.id}`);
    } else navigate(`profile/${user.id}`);
  };

  return (
    <div className={`track_item fade-in-fwd`}>
      <div className={"track_img"}>
        <img src={user.picture_url} onClick={authorClickHandler}></img>
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
