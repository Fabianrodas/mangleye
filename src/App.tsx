import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import MapExplorer from "./pages/MapExplorer";
import Dashboard from "./pages/Dashboard";
import Comparison from "./pages/Comparison";
import Methodology from "./pages/Methodology";
import About from "./pages/About";
import FloodReport from "./pages/FloodReport";
import EcoObservation from "./pages/EcoObservation";
import TechnicalReport from "./pages/TechnicalReport";
import Community from "./pages/Community";
import PriorityZones from "./pages/PriorityZones";
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
          <Route path="/map" element={<MapExplorer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/about" element={<About />} />
          <Route path="/report/flood" element={<FloodReport />} />
          <Route path="/report/ecological" element={<EcoObservation />} />
          <Route path="/report" element={<TechnicalReport />} />
          <Route path="/community" element={<Community />} />
          <Route path="/zones" element={<PriorityZones />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
