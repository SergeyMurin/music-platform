import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { getAuthorAsync } from "../player/player";
import { IUser } from "../../types/user";

type Props = {};
export const UserInfo: React.FC<Props> = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    if (id) {
      getAuthorAsync(id).then((response) => setUser(response.data));
    }
  }, []);
  return (
    <div className={"profile_page"}>
      {!user && <div className={"profile_card"}></div>}
      {user && (
        <>
          <div className={"profile_card"}>
            <div className={"profile_card_img"}>
              <img src={user.picture_url} />
            </div>
            <div className={"profile_info"}>
              <div className={"profile_info_container"}>
                <h1>{user.username}</h1>
                <h2>{user.bio}</h2>
              </div>
            </div>
            <Link to={"favorites"}>
              Favorites <small>{user.favorites_count}</small>
            </Link>
            <Link to={"tracks"}>
              Tracks <small>{user.tracks_count}</small>
            </Link>
            <Link to={"subscribers"}>
              Subscribers <small>{user.subscribers_count}</small>
            </Link>
            <Link to={"subscriptions"}>
              Subscriptions <small>{user.subscriptions_count}</small>
            </Link>
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
};

//
