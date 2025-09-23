import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import { LoginPage } from "@/pages/LoginPage";
import { Dashboard } from "@/pages/DashboardPage";
import { CreatePermitPage } from "./pages/CreatePermitPage";
import { PendingPermitPage } from "@/pages/PendingPermitPage";
import { CompletedPermitPage } from "@/pages/CompletedPermitPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/permit" element={<CreatePermitPage />} />
          <Route
            path="/admin/descargar-permiso-pendiente/:permissionId"
            element={<PendingPermitPage />}
          />
          <Route
            path="/admin/descargar-permiso-completado/:permissionId"
            element={<CompletedPermitPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
