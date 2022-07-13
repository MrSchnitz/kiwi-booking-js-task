import { Loading } from "@kiwicom/orbit-components";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading type="pageLoader" />}>
              <h1>Landing Page</h1>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
