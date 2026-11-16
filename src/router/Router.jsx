import { Navigate, Route, Routes } from "react-router-dom";
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
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
