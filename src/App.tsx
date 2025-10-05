import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRooms from "./pages/AdminRooms";
import Booking from "./pages/Booking";
import CheckInOut from "./pages/CheckInOut";
import Invoice from "./pages/Invoice";
import AdminReports from "./pages/AdminReports";
import AdminNotifications from "./pages/AdminNotifications";
import CustomerBookings from "./pages/CustomerBookings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/customer-bookings" element={<CustomerBookings />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/checkinout" element={<CheckInOut />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-rooms" element={<AdminRooms />} />
          <Route path="/admin-reports" element={<AdminReports />} />
          <Route path="/admin-notifications" element={<AdminNotifications />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
