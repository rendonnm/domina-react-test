import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/layout/Layout";
import { UsersMainPage } from "@/modules/users/pages/UsersMainPage";

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
