import { NavLink, Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import Icon from "../components/common/Icon.jsx";
import { clearAccessToken, getCookie } from "../api/axios.js";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [token, setToken] = useState(() => getCookie("access_token"));

  useEffect(() => {
    setToken(getCookie("access_token"));
  }, [location.pathname]);

  useEffect(() => {
    const syncToken = () => setToken(getCookie("access_token"));
    window.addEventListener("auth-change", syncToken);
    window.addEventListener("storage", syncToken);
    return () => {
      window.removeEventListener("auth-change", syncToken);
      window.removeEventListener("storage", syncToken);
    };
  }, []);

  if (!token) return null;

  const handleLogout = () => {
    clearAccessToken();
    queryClient.removeQueries("fetch_user_info");
    queryClient.removeQueries("fetch_profile_data");
    setToken(null);
    navigate("/login", { replace: true });
  };

  return (
    <header dir="rtl" className="navbar no-print">
      <div className="navbar-inner">
        <Link
          to="/profile"
          className="navbar-brand"
          aria-label="IustCA - صفحه اصلی"
        >
          <span className="navbar-logo">
            <Icon name="gradCap" size={22} />
          </span>
          <span className="navbar-title">
            IustCA
            <small>سامانه رزومه دانشجویی</small>
          </span>
        </Link>

        <nav className="navbar-links" aria-label="ناوبری اصلی">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `navbar-link${isActive ? " active" : ""}`
            }
          >
            پروفایل
          </NavLink>
          <button type="button" className="navbar-link" onClick={handleLogout}>
            خروج از حساب کاربری
          </button>
        </nav>
      </div>
    </header>
  );
}
