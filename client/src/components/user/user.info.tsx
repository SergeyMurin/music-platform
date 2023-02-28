import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { IUser } from "../../types/user";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ButtonSubscribe } from "../button/button.subscribe";
import { getUserAsync } from "../../helpers/requests/requests.user";
import { ClientConfig } from "../../client.config";

enum DisplayedText {
  FAVORITES = "Favorites",
  TRACKS = "Tracks",
  SUBSCRIBERS = "Subscribers",
  SUBSCRIPTIONS = "Subscriptions",
  UPLOAD = "Upload",
}

export const UserInfo: React.FC = () => {
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
              <img src={userInfo.picture_url} alt={"profile"} />
            </div>
            <div className={"profile_info"}>
              <div className={"profile_info_container"}>
                <h1>{userInfo.username}</h1>
                <h2>{userInfo.bio ? userInfo.bio : "No bio"}</h2>
              </div>
              <div className={"buttons"}>
                <Link
                  to={ClientConfig.client_routes.profile.favorites}
                  className={"button"}
                >
                  {DisplayedText.FAVORITES}{" "}
                  <small>{userInfo.favorites_count}</small>
                </Link>
                <Link
                  to={ClientConfig.client_routes.profile.tracks}
                  className={"button"}
                >
                  {DisplayedText.TRACKS} <small>{userInfo.tracks_count}</small>
                </Link>
                <Link
                  to={ClientConfig.client_routes.profile.subscribers}
                  className={"button"}
                >
                  {DisplayedText.SUBSCRIBERS}
                  <small>{userInfo.subscribers_count}</small>
                </Link>
                <Link
                  to={ClientConfig.client_routes.profile.subscriptions}
                  className={"button"}
                >
                  {DisplayedText.SUBSCRIPTIONS}{" "}
                  <small>{userInfo.subscriptions_count}</small>
                </Link>

                {userInfo.id === user?.id && (
                  <Link
                    to={`../${ClientConfig.client_routes.upload.index}`}
                    className={"button"}
                  >
                    {DisplayedText.UPLOAD}
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
