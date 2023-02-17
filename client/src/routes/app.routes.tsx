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

export const AppRoutes: React.FC = () => {
  const { isAuth } = useTypedSelector((state) => state.user);
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={"*"} element={<NotFoundPage />} />
        <Route path={"sign-in"} element={<SignInPage />} />
        <Route path={"sign-up"} element={<SignUpPage />} />
        <Route path={"email"} element={<EmailPage />} />
        <Route path={"email/confirm"} element={<EmailConfirmPage />} />
        {/*?token*/}

        <Route path={"password/forgot"} element={<ForgotPasswordPage />} />
        <Route path={"password/reset"} element={<ResetPasswordPage />} />
        {/*?token*/}

        <Route path={"admin"} element={<AdminPage />} />
        <Route path={"album/:id"} element={<AlbumPage />} />
        <Route path={"playlist/:id"} element={<PlaylistPage />} />

        <Route path={"profile/:id"} element={<ProfilePage />}>
          <Route path={"favorites"} element={<ProfileFavorites />} />
          <Route path={"tracks"} element={<ProfileTracks />} />
          <Route path={"subscribers"} element={<ProfileSubscribers />} />
          <Route path={"subscriptions"} element={<ProfileSubscriptions />} />
        </Route>

        <Route path={"search"} element={<SearchPage />} />
        <Route path={"track/:id"} element={<TrackPage />} />

        {isAuth && (
          <>
            <Route path={"upload"} element={<Upload />} />
            <Route path={"upload/track"} element={<TrackUpload />} />
            <Route path={"upload/album"} element={<AlbumUpload />} />
          </>
        )}
      </Route>
    </Routes>
  );
};
