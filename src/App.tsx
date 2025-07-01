
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { ChatWidget } from "@/components/ChatWidget";
import Marketplace from "./pages/Marketplace";
import Dashboard from "./pages/Dashboard";
import Customize from "./pages/Customize";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            
            <main className="flex-1 flex flex-col">
              <Header />
              
              <div className="flex-1 p-6 overflow-auto">
                <Routes>
                  <Route path="/" element={<Marketplace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/customize" element={<Customize />} />
                  <Route path="/analytics" element={<Dashboard />} />
                  <Route path="/category/:category" element={<Marketplace />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
            
            <ChatWidget />
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
