import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../lib/api";
import toast from "react-hot-toast";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { PasswordInput } from "../components/auth/PasswordInput";
import { FormError } from "../components/auth/FormError";
import { getErrorMessage } from "../lib/utils";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Snip | Sign up";
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/signup", {
        email: email.trim(),
        password,
        name: name.trim(),
      });
      localStorage.setItem("token", data.token);
      toast.success("Account created");
      navigate("/dashboard", { state: location.state });
    } catch (err) {
      setError(getErrorMessage(err, "Something went wrong. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Save and manage your links in one place."
      panelTitle="Create and manage short links."
      panelText="Save your links to your account and see click analytics in your dashboard."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/signin"
            state={location.state}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            autoFocus
            required
            minLength={2}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">At least 8 characters.</p>
        </div>

        <FormError message={error} />

        <Button type="submit" className="mt-1 w-full" disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
