import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <Sidebar />

      <main className="min-h-screen ml-64">
        <Header />

        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;