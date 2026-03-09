import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import { Toaster } from 'react-hot-toast';
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Docs from "./pages/Docs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/analytics/:id" element={<Analytics/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;