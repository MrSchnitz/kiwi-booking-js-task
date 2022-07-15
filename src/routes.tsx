import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import PageLoader from "./components/PageLoader/PageLoader";
import NoMatchPage from "./containers/NoMatchPage/NoMatchPage";

const AsyncLandingPage = lazy(
  () => import("./containers/LandingPage/LandingPage")
);
const AsyncSearchPage = lazy(
  () => import("./containers/SearchPage/SearchPage")
);

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <AsyncLandingPage />
            </Suspense>
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<PageLoader />}>
              <AsyncSearchPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
