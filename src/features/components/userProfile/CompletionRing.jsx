import { useMemo, useState } from "react";
import Icon from "../common/Icon";

const faNum = (value) => Number(value || 0).toLocaleString("fa-IR");

function CompletionRing({ profile }) {
  const [open, setOpen] = useState(false);

  const checks = useMemo(() => {
    const pr = profile?.personal || {};
    return [
      {
        ok:
          !!String(pr.fullName || "").trim() &&
          !!String(pr.title || "").trim(),
        label: "نام و عنوان حرفه‌ای",
      },
      {
        ok: String(pr.about || "").trim().length > 40,
        label: "متن «درباره من» بیش از ۴۰ کاراکتر",
      },
      {
        ok: !!String(pr.username || "").trim() && pr.username.trim().length >= 3,
        label: "نام کاربری",
      },
      { ok: (profile?.skills || []).length >= 3, label: "حداقل ۳ مهارت" },
      {
        ok: (profile?.education || []).length >= 1,
        label: "سوابق تحصیلی",
      },
      {
        ok: (profile?.experiences || []).length >= 1,
        label: "سابقهٔ کاری یا کارآموزی",
      },
      {
        ok: (profile?.activities || []).length >= 1,
        label: "فعالیت‌های دانشگاهی",
      },
      { ok: (profile?.projects || []).length >= 1, label: "حداقل یک پروژه" },
      {
        ok: (profile?.certificates || []).length >= 1,
        label: "دوره‌ها و گواهینامه‌ها",
      },
      {
        ok: (profile?.achievements || []).length >= 1,
        label: "افتخارات و دستاوردها",
      },
      { ok: (profile?.languages || []).length >= 1, label: "زبان‌ها" },
      { ok: (profile?.interests || []).length >= 2, label: "حداقل ۲ علاقه‌مندی" },
      {
        ok: !!String(pr.website || "").trim(),
        label: "وب‌سایت شخصی",
      },
    ];
  }, [profile]);

  const done = checks.filter((c) => c.ok).length;
  const percent = Math.round((done / checks.length) * 100);
  const suggestions = checks.filter((c) => !c.ok);

  return (
    <>
      <button
        type="button"
        className="completion-ring-btn"
        onClick={() => setOpen(true)}
        title="تکمیل پروفایل"
        aria-label={"تکمیل پروفایل " + faNum(percent) + " درصد"}
      >
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle className="ring-bg" cx="20" cy="20" r="17" pathLength="100" />
          <circle
            className="ring-fg"
            cx="20"
            cy="20"
            r="17"
            pathLength="100"
            style={{ strokeDasharray: `${percent} 100` }}
          />
        </svg>
        <span className="completion-ring-num">{faNum(percent)}٪</span>
      </button>

      {open ? (
        <div
          className="modal-overlay"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="completion-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <span className="section-icon">
                <Icon name="circleCheck" size={19} />
              </span>
              <h2 id="completion-modal-title">تکمیل پروفایل</h2>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setOpen(false)}
                aria-label="بستن"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div className="completion-summary">
              <span className="completion-big">{faNum(percent)}٪</span>
              <div
                className="progress"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="درصد تکمیل پروفایل"
              >
                <span style={{ width: percent + "%" }} />
              </div>
              <p className="completion-hint">
                {percent === 100
                  ? "تبریک! پروفایل شما کامل به نظر می‌رسد۔"
                  : suggestions.length +
                    " مورد برای تکمیل پروفایل باقی مانده است۔"}
              </p>
            </div>

            <ul className="completion-list">
              {checks.map((c) => (
                <li key={c.label} className={c.ok ? "done" : ""}>
                  <span className="mark" aria-hidden="true">
                    {c.ok ? <Icon name="check" size={13} /> : null}
                  </span>
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CompletionRing;
