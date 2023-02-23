import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";
import { HomePage } from "../pages/home.page";
import { NotFoundPage } from "../pages/not.found.page";
import { SignInPage } from "../pages/sign.in.page";
import { SignUpPage } from "../pages/sign.up.page";
import { AdminPage } from "../pages/admin.page";
import { EmailPage } from "../pages/email.page";
import { AlbumPage } from "../pages/album.page";
import { PlaylistPage } from "../pages/playlist.page";
import { ProfilePage } from "../pages/profile.page";
import { SearchPage } from "../pages/search.page";
import { TrackPage } from "../pages/track.page";
import { EmailConfirmPage } from "../pages/email.confirm.page";
import { ForgotPasswordPage } from "../pages/forgot.password.page";
import { ResetPasswordPage } from "../pages/reset.password.page";
import { Upload } from "../components/upload/upload";
import { TrackUpload } from "../components/upload/track.upload";
import { AlbumUpload } from "../components/upload/album.upload";
import { ProfileFavorites } from "../components/user/profile.favorites";
import { ProfileTracks } from "../components/user/profile.tracks";
import { ProfileSubscribers } from "../components/user/profile.subscribers";
import { ProfileSubscriptions } from "../components/user/profile.subscriptions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ClientConfig } from "../client.config";

export const AppRoutes: React.FC = () => {
  const { isAuth } = useTypedSelector((state) => state.user);
  return (
    <Routes>
      <Route path={ClientConfig.client_routes.layout} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path={ClientConfig.client_routes.not_found}
          element={<NotFoundPage />}
        />
        <Route
          path={ClientConfig.client_routes.auth.sign_in}
          element={<SignInPage />}
        />
        <Route
          path={ClientConfig.client_routes.auth.sign_up}
          element={<SignUpPage />}
        />
        <Route
          path={ClientConfig.client_routes.auth.email}
          element={<EmailPage />}
        />
        <Route
          path={ClientConfig.client_routes.auth.email_confirm}
          element={<EmailConfirmPage />}
        />
        {/*?token*/}

        <Route
          path={ClientConfig.client_routes.auth.password_forgot}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={ClientConfig.client_routes.auth.password_reset}
          element={<ResetPasswordPage />}
        />
        {/*?token*/}

        <Route
          path={ClientConfig.client_routes.admin}
          element={<AdminPage />}
        />
        <Route
          path={
            ClientConfig.client_routes.album.index +
            `/:` +
            ClientConfig.client_routes.album.param
          }
          element={<AlbumPage />}
        />
        <Route
          path={
            ClientConfig.client_routes.playlist.index +
            `/:` +
            ClientConfig.client_routes.playlist.param
          }
          element={<PlaylistPage />}
        />

        <Route
          path={
            ClientConfig.client_routes.profile.index +
            `/:` +
            ClientConfig.client_routes.profile.param
          }
          element={<ProfilePage />}
        >
          <Route
            path={ClientConfig.client_routes.profile.favorites}
            element={<ProfileFavorites />}
          />
          <Route
            path={ClientConfig.client_routes.profile.tracks}
            element={<ProfileTracks />}
          />
          <Route
            path={ClientConfig.client_routes.profile.subscribers}
            element={<ProfileSubscribers />}
          />
          <Route
            path={ClientConfig.client_routes.profile.subscriptions}
            element={<ProfileSubscriptions />}
          />
        </Route>

        <Route
          path={ClientConfig.client_routes.search}
          element={<SearchPage />}
        />
        <Route
          path={
            ClientConfig.client_routes.track.index +
            `/:` +
            ClientConfig.client_routes.track.param
          }
          element={<TrackPage />}
        />

        {isAuth && (
          <>
            <Route
              path={ClientConfig.client_routes.upload.index}
              element={<Upload />}
            />
            <Route
              path={ClientConfig.client_routes.upload.track}
              element={<TrackUpload />}
            />
            <Route
              path={ClientConfig.client_routes.upload.album}
              element={<AlbumUpload />}
            />
          </>
        )}
      </Route>
    </Routes>
  );
};
