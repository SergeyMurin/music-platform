import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { IUser } from "../../types/user";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getUserAsync } from "../../helpers/requests/userRequests";
import { ClientConfig } from "../../clientConfig";
import { ButtonManager, ButtonManagerType } from "../button/ButtonManager";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

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

  const getUserEffect = () => {
    if (!id) return;
    const getUserAsyncEffect = async () => {
      const response = await getUserAsync(id);
      setUserInfo(response.data);
    };
    getUserAsyncEffect().catch((error) => {
      console.error(error);
    });
  };

  useEffect(getUserEffect, [id]);

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

            {userInfo.id !== user?.id && (
              <ButtonManager
                type={ButtonManagerType.SUBSCRIBE}
                user={userInfo}
              />
            )}
          </div>

          <div className={"after-card"}>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};
