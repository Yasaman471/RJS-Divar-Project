import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import HomePage from "@/Pages/HomePage";
import DashboardPage from "@/Pages/DashboardPage";
import AuthPage from "@/Pages/AuthPage";
import AdminPage from "@/Pages/AdminPage";
import PageNotFound from "@/Pages/404";
import getProfileData from "@/services/user";

function Router() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfileData,
  });

  console.log({ data, isLoading, error });
  if (isLoading) return <h1>Loading...</h1>;

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
