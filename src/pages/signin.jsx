import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { HTTP_BACKEND } from "../../config";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Signin() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
        const response = await axios.post(`${HTTP_BACKEND}/api/auth/signin`, {
            email,
            password
        });

        localStorage.setItem("token", response.data.token);
        
        console.log("Login Success");
        navigate("/dashboard");
    } catch(e) {
        if (e.response?.status === 401) {
          setError("Invalid email or password");
        } else {
          setError("Something went wrong. Please try again.");
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-[#fdfaf8] p-4 font-sans">
      
      
      <Link to="/" className="mb-8 hover:opacity-80 transition-opacity">
        <span className="font-extrabold text-3xl tracking-tight text-zinc-900">
          Snip.
        </span>
      </Link>

      <Card className="w-full max-w-sm shadow-sm border-zinc-200/80 bg-white">
        <CardHeader className="pb-0 text-center">
          <CardTitle className="text-xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your links
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="hello@example.com"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  disabled={loading}
                  className="focus-visible:ring-orange-500"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  disabled={loading}
                  className="focus-visible:ring-orange-500"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            {error && (
              <div className="w-full p-2 bg-red-50 border border-red-200 rounded-md text-center">
                <p className="text-sm font-medium text-red-600">{error}</p>
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <p className="text-sm text-center text-zinc-500">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-zinc-900 hover:text-orange-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}