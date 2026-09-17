import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import Icon from "../components/common/Icon.jsx";
import { getDefaultAvatar } from "../components/common/avatarUtils.js";
import { clearAccessToken, getCookie } from "../api/axios.js";
import { useProfileData } from "../hooks/useProfileData.jsx";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [token, setToken] = useState(() => getCookie("access_token"));
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [suppressed, setSuppressed] = useState(false);
  const menuRef = useRef(null);
  const toastTimer = useRef(null);
  const hoverCapable = useRef(
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(hover: hover)").matches
      : false,
  );
  const menuOpen = pinned || (hovered && !suppressed);
  const { data: profileData } = useProfileData(toastTimer, {
    enabled: !!token,
  });

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

  useEffect(() => {
    setPinned(false);
    setHovered(false);
    setSuppressed(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setPinned(false);
        setHovered(false);
        setSuppressed(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPinned(false);
        setHovered(false);
        setSuppressed(true);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  if (!token) return null;

  const personal = profileData?.personal;
  const avatar = personal?.avatar || getDefaultAvatar(personal?.gender);

  const handleMouseEnter = () => {
    if (!hoverCapable.current) return;
    setHovered(true);
    setSuppressed(false);
  };

  const handleMouseLeave = () => {
    if (!hoverCapable.current) return;
    setHovered(false);
    setSuppressed(false);
  };

  const handleAvatarClick = () => {
    if (pinned) {
      setPinned(false);
      setHovered(false);
      setSuppressed(true);
    } else {
      setPinned(true);
    }
  };

  const handleLogout = () => {
    clearAccessToken();
    queryClient.removeQueries("fetch_user_info");
    queryClient.removeQueries("fetch_profile_data");
    setPinned(false);
    setHovered(false);
    setSuppressed(false);
    setToken(null);
    navigate("/login", { replace: true });
  };

  return (
    <header dir="rtl" className="navbar no-print">
      <div className="navbar-inner">
        <nav className="navbar-links" aria-label="ناوبری اصلی">
          <div
            className="navbar-user"
            ref={menuRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`navbar-avatar-btn${menuOpen ? " active" : ""}`}
              onClick={handleAvatarClick}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="منوی حساب کاربری"
              title={personal?.fullName || "حساب کاربری"}
            >
              <img
                src={avatar}
                alt="تصویر پروفایل"
                onError={(event) => {
                  event.target.src = getDefaultAvatar(personal?.gender);
                }}
              />
            </button>

            {menuOpen ? (
              <div className="navbar-user-menu" role="menu">
                <span className="navbar-user-tail" aria-hidden="true" />
                <Link
                  to="/profile"
                  className="navbar-menu-item"
                  role="menuitem"
                  onClick={() => {
                    setPinned(false);
                    setHovered(false);
                    setSuppressed(false);
                  }}
                >
                  <span className="ic">
                    <Icon name="user" size={16} />
                  </span>
                  <span className="lbl">مشاهده پروفایل</span>
                </Link>
                <button
                  type="button"
                  className="navbar-menu-item danger"
                  onClick={handleLogout}
                  role="menuitem"
                >
                  <span className="ic">
                    <Icon name="logout" size={16} />
                  </span>
                  <span className="lbl">خروج از حساب کاربری</span>
                </button>
              </div>
            ) : null}
          </div>

          <Link
            to="/search"
            className={`navbar-link${
              location.pathname === "/search" ? " active" : ""
            }`}
          >
            <Icon name="search" size={16} />
            جستجوی کاربران
          </Link>
        </nav>

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
            <small>سامانه فارغ التحصیلان</small>
          </span>
        </Link>
      </div>
    </header>
  );
}
