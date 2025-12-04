import { Routes, Route } from "react-router";
import { Layout } from "@/layout/Layout";
import { UsersMainPage } from "@/modules/users/pages/UsersMainPage";
import { BrowserRouter } from "react-router";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<UsersMainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
