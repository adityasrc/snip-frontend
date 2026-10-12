import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../lib/api";
import { toast } from "react-hot-toast";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link as LinkIcon, ArrowLeft, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    if (name.trim().length < 4) {
      setError("Name must be at least 4 characters");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(`/api/auth/signup`, {
        email: email.trim(),
        password,
        name: name.trim(),
      });

      localStorage.setItem("token", response.data.token);
      toast.success("Account created.");
      navigate("/dashboard", { state: location.state });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong. Try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      <div className="hidden lg:flex lg:w-[420px] xl:w-[480px] shrink-0 flex-col justify-between bg-neutral-950 px-12 py-10">
        <Link to="/" className="flex items-center gap-2.5 group w-fit">
          <div className="bg-background p-1.5 rounded-lg transition-transform group-hover:-rotate-12">
            <LinkIcon className="h-4 w-4 text-neutral-950" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-[16px] tracking-tight text-background">Snip</span>
        </Link>

        <div>
          <p className="text-[22px] font-medium text-background leading-[1.4] tracking-[-0.01em] mb-6">
            Create and manage
            <br />
            short links.
          </p>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Save links to your account and view click analytics from your dashboard.
          </p>
        </div>
        <div aria-hidden="true" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-background">
        <div className="w-full max-w-[360px] mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to home
          </Link>
        </div>

        <div className="w-full max-w-[360px]">
          <div className="mb-8">
            <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8 group">
              <div className="bg-foreground p-1.5 rounded-lg transition-transform group-hover:-rotate-12">
                <LinkIcon className="h-4 w-4 text-background" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-[16px] tracking-tight text-foreground">Snip</span>
            </Link>

            <h1 className="text-2xl font-medium text-foreground tracking-[-0.015em] mb-1">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Create an account to save and manage your links.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                autoFocus
                minLength={4}
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="h-10 rounded-lg border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:border-ring transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="h-10 rounded-lg border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:border-ring transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="h-10 rounded-lg border-border bg-background pr-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:border-ring transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={loading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-100 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full h-10 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-primary-foreground rounded-full font-medium text-sm transition-all active:scale-[0.98]"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/signin"
              state={location.state}
              className="font-medium text-foreground hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
