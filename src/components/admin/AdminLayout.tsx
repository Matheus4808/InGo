import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background overflow-x-hidden">

        {/* Sidebar */}
        <AdminSidebar />

        {/* Área principal */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Header */}
          <header className="
            sticky top-0 z-10 
            flex h-16 items-center gap-4 
            border-b border-border 
            bg-background/95 backdrop-blur
            px-4 sm:px-6
          ">
            <SidebarTrigger />
            <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">
              {title}
            </h1>
          </header>

          {/* Conteúdo */}
          <main className="
            flex-1 
            min-w-0 
            px-4 py-4 
            sm:px-6 sm:py-6
          ">
            {children}
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
}
