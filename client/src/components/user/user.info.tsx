import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { IUser } from "../../types/user";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ButtonSubscribe } from "../button/button.subscribe";
import { getUserAsync } from "../../requests/requests.user";

type Props = {};
export const UserInfo: React.FC<Props> = () => {
  const { id } = useParams();
  const { user } = useTypedSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState<IUser>();
  useEffect(() => {
    if (id) {
      getUserAsync(id).then((response) => setUserInfo(response.data));
    }
  }, [id]);
  return (
    <div className={"profile_page"}>
      {!userInfo && <div className={"profile_card"}></div>}
      {userInfo && (
        <>
          <div className={"profile_card"}>
            <div className={"profile_card_img"}>
              <img src={userInfo.picture_url} />
            </div>
            <div className={"profile_info"}>
              <div className={"profile_info_container"}>
                <h1>{userInfo.username}</h1>
                <h2>{userInfo.bio ? userInfo.bio : "No bio"}</h2>
              </div>
              <div className={"buttons"}>
                <Link to={"favorites"} className={"button"}>
                  Favorites <small>{userInfo.favorites_count}</small>
                </Link>
                <Link to={"tracks"} className={"button"}>
                  Tracks <small>{userInfo.tracks_count}</small>
                </Link>
                <Link to={"subscribers"} className={"button"}>
                  Subscribers <small>{userInfo.subscribers_count}</small>
                </Link>
                <Link to={"subscriptions"} className={"button"}>
                  Subscriptions <small>{userInfo.subscriptions_count}</small>
                </Link>

                {userInfo.id === user?.id && (
                  <Link to={"../upload"} className={"button"}>
                    Upload
                  </Link>
                )}
              </div>
            </div>

            {userInfo.id !== user?.id && <ButtonSubscribe user={userInfo} />}
          </div>

          <div className={"after-card"}>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};
