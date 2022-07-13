import { Loading } from "@kiwicom/orbit-components";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

const AsyncLandingPage = lazy(
  () => import("./containers/LandingPage/LandingPage")
);

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading type="pageLoader" />}>
              <AsyncLandingPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
