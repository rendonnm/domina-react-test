import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Suspense, lazy } from "react";

const RemoteUsersPage = lazy(() =>
  import("remote/UsersMainPage").then((module) => ({
    default: module.default || module,
  }))
);

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<div>Cargando usuarios...</div>}>
                <RemoteUsersPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
