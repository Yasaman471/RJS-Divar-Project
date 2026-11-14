import { Route, Routes } from "react-router-dom";

import HomePage from "@/Pages/HomePage";
import DashboardPage from "@/Pages/DashboardPage";
import AuthPage from "@/Pages/AuthPage";
import AdminPage from "@/Pages/AdminPage";
import PageNotFound from "@/Pages/404";

function Router() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
