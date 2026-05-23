import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-card auth-card--login">
          <div className="auth-top">
            <div className="auth-logo" aria-hidden>
              🅱️
            </div>
            <div>
              <h1>BlogCMS</h1>
              <p className="auth-sub">Admin Panel Login</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@blog.com"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <div className="auth-label-row">
                <label>Password</label>
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="auth-row">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <a className="auth-link-muted" href="#" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            <button type="submit" disabled={loading} className="btn-primary full-width">
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="auth-hint auth-hint--inline">
              <p>
                Demo: <b>superadmin@blog.com</b> / <b>password123</b>
              </p>
            </div>
          </form>
        </div>

        <div className="auth-visual" aria-hidden>
          <div className="auth-visual-card">
            <div className="auth-visual-badge">Secure Access</div>
            <h2>Welcome Back</h2>
            <p>Sign in to manage blogs, users, and content in one place.</p>
            <div className="auth-visual-features">
              <div className="feature">
                <span>⚡</span>
                <p>Fast workflow</p>
              </div>
              <div className="feature">
                <span>🔒</span>
                <p>Role-based access</p>
              </div>
              <div className="feature">
                <span>📝</span>
                <p>Rich editing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

