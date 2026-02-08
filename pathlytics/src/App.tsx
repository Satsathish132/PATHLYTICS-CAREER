import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CareerRecommendation from "./pages/CareerRecommendation";
import CareerRoadmaps from "./pages/CareerRoadmaps";
 import CareerRoadmapDetail from "./pages/CareerRoadmapDetail";
import Chatbot from "./pages/Chatbot";
import SavedCareers from "./pages/SavedCareers";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
 import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
           <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
           <Route path="/career-recommendation" element={<ProtectedRoute><CareerRecommendation /></ProtectedRoute>} />
           <Route path="/roadmaps" element={<ProtectedRoute><CareerRoadmaps /></ProtectedRoute>} />
           <Route path="/roadmaps/:careerId" element={<ProtectedRoute><CareerRoadmapDetail /></ProtectedRoute>} />
           <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
           <Route path="/saved-careers" element={<ProtectedRoute><SavedCareers /></ProtectedRoute>} />
           <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
