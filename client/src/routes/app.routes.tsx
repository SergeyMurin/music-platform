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

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={"*"} element={<NotFoundPage />} />
        <Route path={"sign-in"} element={<SignInPage />} />
        <Route path={"sign-up"} element={<SignUpPage />} />
        <Route path={"email"} element={<EmailPage />} />
        <Route path={"email/confirm"} element={<EmailConfirmPage />} />{" "}
        <Route path={"admin"} element={<AdminPage />} />
        <Route path={"album/:id"} element={<AlbumPage />} />
        <Route path={"playlist/:id"} element={<PlaylistPage />} />
        <Route path={"profile/:id"} element={<ProfilePage />} />
        <Route path={"search"} element={<SearchPage />} />
        <Route path={"track/:id"} element={<TrackPage />} />
      </Route>
    </Routes>
  );
};
