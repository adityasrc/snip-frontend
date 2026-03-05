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

export default function Signup() {
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
        const response = await axios.post(`${HTTP_BACKEND}/api/auth/signup`, {
            name,
            email,
            password
        });
        navigate("/signin");
    } catch(e) {
        if (e.response?.data?.message) {
          setError(e.response.data.message);
        } else {
          setError("Something went wrong. Try again.");
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-[#fdfaf8] p-4 font-sans">
      
      {/* Plain Text Brand Name */}
      <Link to="/" className="mb-8 hover:opacity-80 transition-opacity">
        <span className="font-extrabold text-3xl tracking-tight text-zinc-900">
          Snip.
        </span>
      </Link>

      <Card className="w-full max-w-sm shadow-sm border-zinc-200/80 bg-white">
        <CardHeader className="pb-0 text-center">
          <CardTitle className="text-xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your details to start shortening URLs
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Aditya Prakash"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  disabled={loading}
                  className="focus-visible:ring-orange-500"
                />
              </div>

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
                <Label htmlFor="password">Password</Label>
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
              {loading ? "Creating account..." : "Sign up"}
            </Button>

            <p className="text-sm text-center text-zinc-500">
              Already have an account?{" "}
              <Link to="/signin" className="font-semibold text-zinc-900 hover:text-orange-600 hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}