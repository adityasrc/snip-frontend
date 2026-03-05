import { BrowserRouter, Routes, Route } from "react-router-dom";

// Temporary placeholder components 
const Home = () => <div>Home Page</div>;
const Login = () => <div>Login Page</div>;
const Dashboard = () => <div>Dashboard</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;