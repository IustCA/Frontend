import { useMemo } from "react";
import Icon from "../common/Icon";

const faNum = (value) => Number(value || 0).toLocaleString("fa-IR");

function CompletionProgress({ profile, isValidEmail }) {
  const completion = useMemo(() => {
    const pr = profile.personal;
    const checks = [
      {
        ok: !!pr.fullName.trim() && !!pr.title.trim(),
        label: "نام و عنوان حرفه‌ای خود را کامل کنید۔",
      },
      {
        ok: String(pr.about || "").trim().length > 40,
        label: "بخش «درباره من» را بنویسید۔",
      },
      { ok: isValidEmail(pr.email), label: "ایمیل معتبر وارد کنید۔" },
      { ok: profile.skills.length >= 3, label: "حداقل ۳ مهارت اضافه کنید۔" },
      {
        ok: profile.education.length >= 1,
        label: "سوابق تحصیلی خود را ثبت کنید۔",
      },
      {
        ok: profile.experiences.length >= 1,
        label: "سابقهٔ کاری یا کارآموزی اضافه کنید۔",
      },
      {
        ok: profile.activities.length >= 1,
        label: "فعالیت‌های دانشگاهی را ثبت کنید۔",
      },
      { ok: profile.projects.length >= 1, label: "حداقل یک پروژه اضافه کنید۔" },
      {
        ok: profile.certificates.length >= 1,
        label: "دوره‌ها و گواهینامه‌ها را کامل کنید۔",
      },
      {
        ok: profile.achievements.length >= 1,
        label: "افتخارات و دستاوردها را ثبت کنید۔",
      },
      {
        ok: profile.languages.length >= 1,
        label: "زبان‌های خود را اضافه کنید۔",
      },
      { ok: profile.interests.length >= 2, label: "علایق خود را ثبت کنید۔" },
      {
        ok: !!String(pr.website || "").trim(),
        label: "وب‌سایت شخصی خود را اضافه کنید۔",
      },
    ];
    const done = checks.filter((c) => c.ok).length;
    return {
      percent: Math.round((done / checks.length) * 100),
      suggestions: checks.filter((c) => !c.ok).map((c) => c.label),
    };
  }, [profile, isValidEmail]);

  return (
    <section className="card" aria-labelledby="completion-title">
      <div className="section-head">
        <span className="section-icon">
          <Icon name="circleCheck" size={19} />
        </span>
        <h2 id="completion-title">تکمیل پروفایل</h2>
        <span className="completion-num head-action">
          {faNum(completion.percent)}٪
        </span>
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-valuenow={completion.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="درصد تکمیل پروفایل"
      >
        <span style={{ width: completion.percent + "%" }} />
      </div>
      <p style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 8 }}>
        {completion.percent === 100
          ? "تبریک! پروفایل شما کامل به نظر می‌رسد۔"
          : "پروفایل شما " + faNum(completion.percent) + "٪ تکمیل شده است۔"}
      </p>
      {completion.suggestions.length > 0 ? (
        <ul className="suggest">
          {completion.suggestions.slice(0, 3).map((s) => (
            <li key={s}>
              <Icon name="sparkles" size={14} />
              {s}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default CompletionProgress;
