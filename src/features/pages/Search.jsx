import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Icon from "../components/common/Icon.jsx";
import { getDefaultAvatar } from "../components/common/avatarUtils.js";
import { useStudentsSearch } from "../hooks/useStudentsSearch.jsx";

const toFa = (value) => String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const ABOUT_LINES = 4;

const PER_PAGE_OPTIONS = [4, 8, 12, 16, 20];

function Highlight({ text, query }) {
  if (!query) return text;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

function ClampedAbout({ text, query }) {
  const boxRef = useRef(null);
  const mirrorRef = useRef(null);
  const [display, setDisplay] = useState(text);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const mirror = mirrorRef.current;
    if (!box || !mirror) return undefined;

    const fit = () => {
      const styles = window.getComputedStyle(box);
      const contentWidth =
        box.clientWidth -
        parseFloat(styles.paddingLeft || 0) -
        parseFloat(styles.paddingRight || 0);
      if (contentWidth <= 0) return;

      const lineHeight = parseFloat(styles.lineHeight) || 24;
      const maxHeight = lineHeight * ABOUT_LINES;
      mirror.style.width = `${contentWidth}px`;

      mirror.textContent = text;
      if (mirror.scrollHeight <= maxHeight + 1) {
        setDisplay(text);
        return;
      }

      let low = 0;
      let high = text.length;
      let best = 0;
      while (low <= high) {
        const mid = (low + high) >> 1;
        mirror.textContent = `${text.slice(0, mid)}…`;
        if (mirror.scrollHeight <= maxHeight + 1) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      const trimmed = text.slice(0, best).replace(/\s+\S*$/, "");
      setDisplay(`${trimmed || text.slice(0, best)}…`);
    };

    fit();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", fit);
      return () => window.removeEventListener("resize", fit);
    }
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [text]);

  return (
    <>
      <p className="search-about" ref={boxRef} title={text}>
        <Highlight text={display} query={query} />
      </p>
      <span
        className="search-about search-about-mirror"
        ref={mirrorRef}
        aria-hidden="true"
      />
    </>
  );
}

export default function Search({ toastTimer }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(1);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(timer);
  }, [query]);

  const offset = (page - 1) * perPage;

  const { data, isLoading } = useStudentsSearch(toastTimer, {
    full_name: debouncedQuery.trim(),
    offset,
    limit: perPage,
  });

  const results = data?.results ?? [];
  const total = data?.count ?? 0;

  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(page, totalPages);
  const rangeStart = total ? offset + 1 : 0;
  const rangeEnd = Math.min(offset + perPage, total);

  const goToPage = (next) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setPage(1);
  };

  const handlePerPageChange = (event) => {
    setPerPage(Number(event.target.value));
    setPage(1);
  };

  return (
    <div dir="rtl" className="app search-app">
      <section className="search-hero">
        <div className="search-hero-pattern" aria-hidden="true" />
        <div className="search-hero-content">
          <span className="search-hero-badge">
            <Icon name="sparkles" size={15} />
            جامعه دانشجویان IustCA
          </span>
          <h1>جستجوی دانشجویان</h1>
          <p>
            با جستجوی نام کامل، هم‌کلاسی‌ها و هم‌رشته‌های خودتان را پیدا کنید.
          </p>

          <div className="search-field-wrap">
            <span className="search-field-icon">
              <Icon name="search" size={19} />
            </span>
            <input
              ref={inputRef}
              type="search"
              className="search-field"
              placeholder="نام کامل دانشجو..."
              value={query}
              onChange={handleQueryChange}
              aria-label="جستجوی نام کامل دانشجو"
            />
            {query ? (
              <button
                type="button"
                className="search-field-clear"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="پاک کردن جستجو"
              >
                <Icon name="x" size={16} />
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <div className="search-results-head" ref={resultsRef}>
        <h2>
          {query ? (
            <>
              نتایج برای «<span className="search-query">{query}</span>»
            </>
          ) : (
            "همه دانشجویان"
          )}
        </h2>
        <span className="search-count">{toFa(total)} دانشجو</span>
      </div>

      {isLoading ? (
        <div className="search-empty">
          <span className="search-empty-icon">
            <Icon name="search" size={28} />
          </span>
          <h3>در حال بارگذاری...</h3>
          <p>لطفا کمی صبر کنید.</p>
        </div>
      ) : results.length === 0 ? (
        <div className="search-empty">
          <span className="search-empty-icon">
            <Icon name="search" size={28} />
          </span>
          <h3>دانشجویی پیدا نشد</h3>
          <p>نام را تغییر دهید و دوباره جستجو کنید.</p>
        </div>
      ) : (
        <div className="search-grid">
          {results.map((student) => {
            const fullName = student.fullname ?? "";
            const avatar = student.avatar || getDefaultAvatar();
            return (
              <article key={student.id} className="search-card">
                <div className="search-card-cover" aria-hidden="true" />

                <div className="search-card-body">
                  <div className="search-avatar-ring">
                    <img
                      className="search-avatar"
                      src={avatar}
                      alt={`تصویر ${fullName}`}
                      loading="lazy"
                    />
                  </div>

                  <h3 className="search-name">
                    <Highlight text={fullName} query={query} />
                  </h3>
                  <span className="search-student-tag">
                    <Icon name="gradCap" size={13} />
                    دانشجو
                  </span>

                  <ClampedAbout text={student.about || ""} query={query} />

                  <span className="search-card-spacer" aria-hidden="true" />

                  <Link
                    to={`/profile/${student.id}`}
                    className="btn btn-primary btn-sm search-profile-btn"
                  >
                    <Icon name="user" size={15} />
                    مشاهده پروفایل
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {total > 0 ? (
        <div className="search-pagination">
          <label className="search-perpage">
            <span>نمایش</span>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              aria-label="تعداد کاربر در هر صفحه"
            >
              {PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {toFa(option)}
                </option>
              ))}
            </select>
            <span>در صفحه</span>
          </label>

          <span className="search-range">
            نمایش {toFa(rangeStart)}–{toFa(rangeEnd)} از {toFa(total)}
          </span>

          {totalPages > 1 ? (
            <div className="search-pager" role="navigation" aria-label="صفحه‌بندی">
              <button
                type="button"
                className="search-page-btn nav"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="صفحه قبلی"
              >
                <Icon name="arrowRight" size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`search-page-btn${
                    num === currentPage ? " active" : ""
                  }`}
                  onClick={() => goToPage(num)}
                  aria-current={num === currentPage ? "page" : undefined}
                >
                  {toFa(num)}
                </button>
              ))}
              <button
                type="button"
                className="search-page-btn nav"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="صفحه بعدی"
              >
                <Icon name="arrowLeft" size={16} />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
