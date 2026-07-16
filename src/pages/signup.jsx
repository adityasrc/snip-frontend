import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../lib/api";
import { toast } from "react-hot-toast";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link as LinkIcon } from "lucide-react";
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
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await api.post(`/api/auth/signup`, {
        email: email.trim(),
        password,
        name: name.trim()
      });

      toast.success("Account created successfully. Please sign in.");

      navigate("/signin", { state: location.state });

    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-background bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:16px_16px] p-4 pt-10 font-sans selection:bg-primary/20">

      <Link to="/" className="mb-12 flex items-center gap-2.5 group hover:opacity-90 transition-opacity">
        <div className="bg-orange-600 dark:bg-orange-500 p-1.5 rounded-xl transition-transform group-hover:-rotate-12 shadow-sm">
          <LinkIcon className="h-6 w-6 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-extrabold text-3xl tracking-tight text-foreground">
          Snip
        </span>
      </Link>

      <Card className="w-full max-w-sm rounded-2xl shadow-lg border-border bg-card">
        <CardHeader className="pb-0 text-center">
          <CardTitle className="text-xl font-bold text-foreground">Create an account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your details to start shortening URLs
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <Input
                  id="name"
                  type="text"
                  autoFocus
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="focus-visible:ring-orange-500 border-border placeholder:text-muted-foreground text-foreground rounded-xl bg-transparent"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="focus-visible:ring-orange-500 border-border placeholder:text-muted-foreground text-foreground rounded-xl bg-transparent"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="focus-visible:ring-orange-500 border-border placeholder:text-muted-foreground text-foreground rounded-xl bg-transparent"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            {error && (
              <div className="w-full p-2 bg-destructive/10 border border-destructive/20 rounded-xl text-center">
                <p className="text-sm font-medium text-destructive">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !name.trim() || !email.trim() || !password.trim()}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold h-11 rounded-xl transition-all hover:-translate-y-[1px] active:scale-95 shadow-sm disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading ? "Creating account..." : "Sign up"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" state={location.state} className="font-semibold text-foreground hover:text-orange-600 dark:hover:text-orange-500 transition-colors">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}