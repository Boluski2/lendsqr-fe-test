import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import NotFound from "./pages/NotFound";
import "./styles/global.scss";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/users" replace />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:userId" element={<UserDetails />} />
            {/* Placeholder routes for other sections */}
            <Route path="*" element={<div style={{ padding: '60px', textAlign: 'center', color: '#545F7D' }}>Coming soon...</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
