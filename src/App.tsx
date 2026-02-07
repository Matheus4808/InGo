import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminEventDetails from "./pages/admin/AdminEventDetails";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminCreateEvent from "./pages/admin/AdminCreateEvent";
import NotFound from "./pages/NotFound";
import Scanner from "./pages/Scanner";
import ScannerLogin from './pages/admin/ScannerLogin';
import { ProtectedRoute } from "./pages/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from './pages/TermsOfUse';
import BecomeOrganizer from "./pages/BecomeOrganizer";
import AdminEditEvents from "./pages/admin/AdminEditEvents";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin/login" element={ <AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/events/:id" element={<AdminEventDetails />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/create-event" element={<AdminCreateEvent />} />
            <Route path="/admin/events/edit/:id" element={<AdminEditEvents />} />
            <Route path="/validate/scanner" element={<Scanner />} />
            <Route path="/validate/scanner/login" element={<ScannerLogin />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos-de-uso" element={<TermsOfUse />} />
            <Route path="/seja-um-organizador" element={<BecomeOrganizer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
