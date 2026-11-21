import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/Services/token";
import { useState } from "react";
import styles from "./Header.module.css";
import { getProfileData } from "@/Services/user";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfileData,
    retry: false,
  });

  const isAdmin = profile?.data?.role === "ADMIN";
  const isLoggedIn = Boolean(profile);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    queryClient.setQueryData(["Profile"], false);
    queryClient.removeQueries({ queryKey: ["my-post-list"] });
    setIsMenuOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerRight}>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} alt="دیوار" />
        </Link>

        <span className={styles.location}>
          <img src="location.svg" alt="موقعیت مکانی" />
          <p>تهران</p>
        </span>
      </div>

      <div className={styles.headerLeft}>
        <div className={styles.profileMenu}>
          <button
            type="button"
            className={styles.profileButton}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <img src="profile.svg" alt="پروفایل" />
            <span>دیوار من</span>
          </button>

          {isMenuOpen && (
            <div className={styles.dropdown}>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={styles.menuItem}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>⚙</span>
                  <span>ورود به پنل ادمین</span>
                </Link>
              )}
              {!isLoggedIn && (
                <Link to="/auth" className={styles.menuItem}>
                  <span>♙</span>
                  <span>ورود به حساب کاربری</span>
                </Link>
              )}
              <Link to="/profile" className={styles.menuItem}>
                <span>♙</span>
                <span>کاربر دیوار</span>
              </Link>

              <Link to="/verify" className={styles.menuItem}>
                <span>◉</span>
                <span>تأیید هویت</span>
              </Link>

              <Link to="/dashboard" className={styles.menuItem}>
                <span>▣</span>
                <span>آگهی‌های من</span>
              </Link>

              <Link to="/saved" className={styles.menuItem}>
                <span>♡</span>
                <span>نشان‌شده‌ها</span>
              </Link>

              <Link to="/notes" className={styles.menuItem}>
                <span>▤</span>
                <span>یادداشت‌ها</span>
              </Link>

              <Link to="/recent" className={styles.menuItem}>
                <span>◷</span>
                <span>بازدیدهای اخیر</span>
              </Link>

              <Link to="/auth" className={styles.menuItem}>
                <span>♙</span>
                <span>ورود / ثبت‌نام</span>
              </Link>

              <button
                type="button"
                className={`${styles.menuItem} ${styles.logout}`}
                onClick={logoutHandler}
              >
                <span>↪</span>
                <span>خروج</span>
              </button>
            </div>
          )}
        </div>

        <Link to="/dashboard" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
