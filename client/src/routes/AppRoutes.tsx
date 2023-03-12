import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { SignInPage } from "../pages/SignInPage";
import { SignUpPage } from "../pages/SignUpPage";
import { AdminPage } from "../pages/AdminPage";
import { EmailPage } from "../pages/EmailPage";
import { AlbumPage } from "../pages/AlbumPage";
import { PlaylistPage } from "../pages/PlaylistPage";
import { ProfilePage } from "../pages/ProfilePage";
import { SearchPage } from "../pages/SearchPage";
import { TrackPage } from "../pages/TrackPage";
import { EmailConfirmPage } from "../pages/EmailConfirmPage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";
import { ResetPasswordPage } from "../pages/ResetPasswordPage";
import { Upload } from "../components/upload/Upload";
import { TrackUpload } from "../components/upload/TrackUpload";
import { AlbumUpload } from "../components/upload/AlbumUpload";
import { ProfileFavorites } from "../components/user/ProfileFavorites";
import { ProfileTracks } from "../components/user/ProfileTracks";
import { ProfileSubscribers } from "../components/user/ProfileSubscribers";
import { ProfileSubscriptions } from "../components/user/ProfileSubscriptions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ClientConfig } from "../clientConfig";

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
        <Route
          path={ClientConfig.client_routes.auth.password_forgot}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={ClientConfig.client_routes.auth.password_reset}
          element={<ResetPasswordPage />}
        />

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
