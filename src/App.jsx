import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";


const Landing = lazy(() => import("./pages/Landing"));
const Signup = lazy(() => import("./pages/signup"));
const Signin = lazy(() => import("./pages/signin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Docs = lazy(() => import("./pages/Docs"));
const RedirectHandler = lazy(() => import("./pages/RedirectHandler"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Simple fallback loader
const PageLoader = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics/:id" element={<Analytics />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/:shortId" element={<RedirectHandler />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;