import React from "react";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../lib/api";
import { toast } from "react-hot-toast";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link as LinkIcon, ArrowLeft, AlertCircle } from "lucide-react";

export default function Signin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(`/api/auth/signin`, {
        email: email.trim(),
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard", { state: location.state });
      toast.success("Signed in successfully!");
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Invalid email or password");
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[420px] xl:w-[480px] shrink-0 flex-col justify-between bg-[#0a0a0a] px-12 py-10 relative overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-2.5 group w-fit">
          <div className="bg-white p-1.5 rounded-lg transition-transform group-hover:-rotate-12">
            <LinkIcon className="h-4 w-4 text-[#0a0a0a]" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-[16px] tracking-tight text-white">Snip</span>
        </Link>

        {/* Middle quote */}
        <div className="relative z-10">
          <p className="text-[22px] font-medium text-white leading-[1.4] tracking-[-0.01em] mb-6">
            All your links.
            <br />
            All their analytics.
            <br />
            One place.
          </p>
          <p className="text-[14px] text-[#525252] leading-relaxed">
            Create short links and see where every click comes from — country, device, browser. No config, no tracking scripts.
          </p>
        </div>

        {/* Bottom stack labels */}
        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          {["Bun", "Express", "MongoDB", "React"].map((t) => (
            <span key={t} className="text-[11px] font-medium text-[#404040] border border-[#262626] rounded-full px-2.5 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-[#fafafa]">

        {/* Back link */}
        <div className="w-full max-w-[360px] mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#737373] hover:text-[#171717] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to home
          </Link>
        </div>

        <div className="w-full max-w-[360px]">
          {/* Header */}
          <div className="mb-8">
            {/* Mobile logo */}
            <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8 group">
              <div className="bg-[#0a0a0a] p-1.5 rounded-lg transition-transform group-hover:-rotate-12">
                <LinkIcon className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-[16px] tracking-tight text-[#0a0a0a]">Snip</span>
            </Link>

            <h1 className="text-[24px] font-medium text-[#0a0a0a] tracking-[-0.015em] mb-1">
              Welcome back
            </h1>
            <p className="text-[14px] text-[#737373]">
              Sign in to your account to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-[13px] font-medium text-[#171717]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoFocus
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="h-10 rounded-lg border-[#e5e5e5] bg-white text-[14px] text-[#171717] placeholder:text-[#a3a3a3] focus-visible:ring-2 focus-visible:ring-[#0a0a0a]/10 focus-visible:border-[#0a0a0a] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-[13px] font-medium text-[#171717]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="h-10 rounded-lg border-[#e5e5e5] bg-white text-[14px] text-[#171717] placeholder:text-[#a3a3a3] focus-visible:ring-2 focus-visible:ring-[#0a0a0a]/10 focus-visible:border-[#0a0a0a] transition-colors"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-100 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-[13px] text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="mt-1 w-full h-10 bg-[#0a0a0a] hover:bg-[#262626] disabled:bg-[#e5e5e5] disabled:text-[#a3a3a3] disabled:cursor-not-allowed text-white rounded-full font-medium text-[14px] transition-all active:scale-[0.98]"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          {/* Footer link */}
          <p className="mt-6 text-center text-[13px] text-[#737373]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              state={location.state}
              className="font-medium text-[#171717] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}