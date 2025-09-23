import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import { LoginPage } from "@/pages/LoginPage";
import { Dashboard } from "@/pages/DashboardPage";
import { CreatePermitPage } from "./pages/CreatePermitPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/permit" element={<CreatePermitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
