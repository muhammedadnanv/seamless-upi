
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DonatingWidgetDemo from "./pages/DonatingWidgetDemo";
import { AppProvider } from "@/context/AppContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";
import RouteGuard from "@/components/RouteGuard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors, but retry on network errors
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      onError: (error) => {
        console.error('Query error:', error);
        // Redirect to 404 if it's a page loading error
        if (error instanceof Error && error.message.includes('404')) {
          window.location.href = '/404-not-found';
        }
      },
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ErrorBoundary>
            <AppProvider>
              <AuthProvider>
                <NotificationProvider>
                  <BrowserRouter>
                    <RouteErrorBoundary fallbackTo404={true}>
                      <Routes>
                        <Route path="/" element={
                          <RouteGuard>
                            <Landing />
                          </RouteGuard>
                        } />
                        <Route path="/app" element={
                          <RouteGuard>
                            <Index />
                          </RouteGuard>
                        } />
                        <Route path="/widget" element={
                          <RouteGuard>
                            <DonatingWidgetDemo />
                          </RouteGuard>
                        } />
                        {/* Explicit 404 route */}
                        <Route path="/404-not-found" element={<NotFound />} />
                        {/* Catch-all route that redirects to 404 */}
                        <Route path="*" element={<Navigate to="/404-not-found" replace />} />
                      </Routes>
                    </RouteErrorBoundary>
                  </BrowserRouter>
                </NotificationProvider>
              </AuthProvider>
            </AppProvider>
          </ErrorBoundary>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
