import Icon from "../components/common/Icon.jsx";

const teacher = {
  fullName: "دکتر مریم احمدی",
  rank: "استاد تمام",
  faculty: "دانشکده مهندسی کامپیوتر",
  department: "گروه نرم‌افزار و هوش مصنوعی",
  employment: "عضو هیئت علمی رسمی",
  since: "عضو هیئت علمی از ۱۳۹۱",
  office: "ساختمان دانشکده، طبقه سوم، اتاق ۳۰۷",
  officeHours: "شنبه و دوشنبه — ۱۰ تا ۱۲",
  email: "ahmadi@iust.ac.ir",
  phone: "۰۲۱-۷۳۲۲xxxx",
  avatar: "",
  verified: true,
  orcid: "0000-0002-xxxx-xxxx",
  bio: "دکتر مریم احمدی، استاد تمام مهندسی کامپیوتر، بیش از ۱۵ سال سابقه تدریس و پژوهش در حوزه هوش مصنوعی، یادگیری ماشین و پردازش زبان طبیعی دارد. راهنمایی بیش از ۳۰ پایان‌نامه کارشناسی ارشد و ۸ رساله دکتری، انتشار بیش از ۷۰ مقاله علمی، و اجرای چندین طرح پژوهشی ملی و صنعتی در کارنامه ایشان است. تمرکز فعلی گروه تحقیقاتی ایشان بر مدل‌های زبانی فارسی و یادگیری عمیق قابل اعتماد است.",
  researchAreas: [
    "یادگیری ماشین",
    "پردازش زبان طبیعی",
    "مدل‌های زبانی فارسی",
    "یادگیری عمیق قابل اعتماد",
    "داده‌کاوی",
  ],
  stats: [
    { value: "۱۸", label: "h-index" },
    { value: "۱٬۲۴۰", label: "استنادات" },
    { value: "۷۲", label: "مقاله علمی" },
    { value: "۳۸", label: "پایان‌نامه راهنمایی‌شده" },
    { value: "۱۵", label: "سال سابقه" },
  ],
  links: [
    { name: "Google Scholar", icon: "gradCap", url: "https://scholar.google.com" },
    { name: "ORCID", icon: "hash", url: "https://orcid.org" },
    { name: "Scopus", icon: "book", url: "#" },
    { name: "ResearchGate", icon: "users", url: "#" },
    { name: "وب‌سایت آزمایشگاه", icon: "globe", url: "#" },
    { name: "لینکدین", icon: "linkedin", url: "#" },
  ],
  capacity: {
    open: true,
    text: "برای نیمسال آینده، ظرفیت پذیرش ۲ دانشجوی کارشناسی ارشد و ۱ دانشجوی دکتری در حوزه پردازش زبان طبیعی وجود دارد. ارسال رزومه و نمره درس یادگیری ماشین الزامی است.",
  },
  education: [
    {
      degree: "دکتری مهندسی کامپیوتر",
      university: "دانشگاه صنعتی شریف",
      year: "۱۳۸۹",
      thesis: "عنوان رساله: مدل‌سازی آماری زبان فارسی با رویکرد سلسله‌مراتبی",
    },
    {
      degree: "کارشناسی ارشد مهندسی کامپیوتر",
      university: "دانشگاه تهران",
      year: "۱۳۸۴",
      thesis: "پایان‌نامه: دسته‌بندی متون فارسی با ماشین بردار پشتیبان",
    },
    {
      degree: "کارشناسی مهندسی کامپیوتر",
      university: "دانشگاه علم و صنعت ایران",
      year: "۱۳۸۲",
      thesis: "",
    },
  ],
  courses: [
    { title: "یادگیری ماشین", code: "CE-401", term: "نیمسال جاری — کارشناسی ارشد", time: "شنبه‌ها ۱۳ تا ۱۵" },
    { title: "پردازش زبان طبیعی پیشرفته", code: "CE-612", term: "نیمسال جاری — دکتری", time: "دوشنبه‌ها ۱۰ تا ۱۲" },
    { title: "داده‌کاوی", code: "CE-305", term: "سوابق تدریس", time: "" },
    { title: "هوش مصنوعی", code: "CE-201", term: "سوابق تدریس", time: "" },
  ],
  papers: [
    {
      title: "مدل زبانی فارسی با تنظیم کارا بر داده‌های کم‌منبع",
      authors: "احمدی، م.؛ کریمی، س.؛ محمدی، ر.",
      venue: "مجله هوش مصنوعی ایران",
      year: "۱۴۰۳",
      cites: "۴۸",
      tag: "ژورنالی",
      doi: "https://doi.org/10.xxxx/xxxxx",
    },
    {
      title: "تشخیص اخبار جعلی فارسی با ترکیب دانش بیرونی و ترانسفورمر",
      authors: "احمدی، م.؛ رضایی، ن.",
      venue: "کنفرانس بین‌المللی پردازش زبان (ACL Workshop)",
      year: "۱۴۰۲",
      cites: "۳۱",
      tag: "کنفرانسی",
      doi: "https://doi.org/10.xxxx/xxxxx",
    },
    {
      title: "یادگیری عمیق قابل اعتماد برای سامانه‌های حساس",
      authors: "احمدی، م.؛ حسینی، ا. و همکاران",
      venue: "Expert Systems with Applications",
      year: "۱۴۰۱",
      cites: "۹۶",
      tag: "ژورنالی (ISI)",
      doi: "https://doi.org/10.xxxx/xxxxx",
    },
  ],
  books: [
    { title: "یادگیری ماشین کاربردی با پایتون", role: "تألیف", publisher: "انتشارات دانشگاه", year: "۱۴۰۰" },
    { title: "فصل «پردازش زبان فارسی» در کتاب پردازش زبان‌های کم‌منبع", role: "فصل کتاب", publisher: "Springer", year: "۱۴۰۲" },
  ],
  projects: [
    { title: "دستیار هوشمند فارسی خدمات دانشگاهی", sponsor: "معاونت پژوهشی", role: "مجری", period: "۱۴۰۲ تا ۱۴۰۴", amount: "گرنت پژوهشی" },
    { title: "تحلیل هوشمند متون حقوقی", sponsor: "صنعت (کارفرمای بیرونی)", role: "همکار اصلی", period: "۱۴۰۰ تا ۱۴۰۲", amount: "طرح صنعتی" },
  ],
  theses: [
    { student: "سارا کریمی", level: "دکتری", title: "مدل‌های زبانی چندوظیفه‌ای فارسی", year: "۱۴۰۳", status: "دفاع‌شده" },
    { student: "علی محمدی", level: "ارشد", title: "خلاصه‌سازی انتزاعی اخبار فارسی", year: "۱۴۰۲", status: "دفاع‌شده" },
    { student: "نگار رضایی", level: "ارشد", title: "تشخیص ناهنجاری در شبکه‌های اجتماعی", year: "در حال انجام", status: "در حال انجام" },
    { student: "امیر حسینی", level: "دکتری", title: "استدلال در مدل‌های زبانی بزرگ", year: "در حال انجام", status: "در حال انجام" },
  ],
  executive: [
    { role: "مدیر گروه نرم‌افزار", org: "دانشکده مهندسی کامپیوتر", period: "۱۳۹۸ تا ۱۴۰۰" },
    { role: "عضو شورای پژوهشی دانشگاه", org: "دانشگاه علم و صنعت", period: "۱۴۰۰ تاکنون" },
    { role: "سردبیر همکار نشریه هوش مصنوعی", org: "نشریه علمی", period: "۱۴۰۱ تاکنون" },
  ],
  honors: ["پژوهشگر برتر دانشگاه (۱۴۰۲)", "جایزه مقاله برتر کنفرانس NLP (۱۴۰۲)", "سرآمد آموزشی دانشکده (۱۴۰۰)"],
  memberships: ["انجمن کامپیوتر ایران", "انجمن هوش مصنوعی ایران", "IEEE (عضو ارشد)"],
  lab: {
    name: "آزمایشگاه هوش مصنوعی و زبان (AILab)",
    desc: "گروه تحقیقاتی ۱۲ نفره شامل دانشجویان دکتری و ارشد؛ جلسات هفتگی دوشنبه‌ها ساعت ۱۴. پذیرش دانشجوی جدید از طریق ایمیل با موضوع «درخواست همکاری پژوهشی».",
  },
};

const faNum = (v) => v;

function ScholarLinks() {
  return (
    <div className="tprof-links">
      {teacher.links.map((l) => (
        <a key={l.name} href={l.url} target="_blank" rel="noreferrer" className="tprof-link">
          <Icon name={l.icon} size={15} />
          {l.name}
          <Icon name="external" size={12} />
        </a>
      ))}
    </div>
  );
}

export default function TeacherProfile() {
  return (
    <div dir="rtl" className="app tprof">
      {/* ── سربرگ رسمی ─────────────────────────────── */}
      <header className="card tprof-hero">
        <div className="tprof-cover" aria-hidden="true">
          <div className="tprof-cover-pattern" />
          <div className="tprof-cover-gold" />
        </div>
        <div className="tprof-hero-body">
          <div className="tprof-avatar-wrap">
            <div className="tprof-avatar" aria-label={"تصویر " + teacher.fullName}>
              <span aria-hidden="true">{teacher.fullName.replace("دکتر ", "").trim().charAt(0)}</span>
              {teacher.avatar ? <img src={teacher.avatar} alt={teacher.fullName} /> : null}
            </div>
            <span className="tprof-rank-badge">
              <Icon name="award" size={13} />
              {teacher.rank}
            </span>
          </div>

          <div className="tprof-id">
            <div className="tprof-verified-row">
              <h1>{teacher.fullName}</h1>
              {teacher.verified ? (
                <span className="tprof-verified" title="هویت تأییدشده توسط دانشگاه">
                  <Icon name="circleCheck" size={15} />
                  تأییدشده
                </span>
              ) : null}
            </div>
            <p className="tprof-dept">
              {teacher.faculty} <span aria-hidden="true">·</span> {teacher.department}
            </p>
            <div className="tprof-chips">
              <span className="chip">
                <Icon name="briefcase" size={13} />
                {teacher.employment}
              </span>
              <span className="chip">
                <Icon name="calendar" size={13} />
                {teacher.since}
              </span>
              <span className="chip">
                <Icon name="mapPin" size={13} />
                {teacher.office}
              </span>
            </div>
            <p className="tprof-hours">
              <Icon name="clock" size={14} />
              ساعات مراجعه: {teacher.officeHours}
            </p>
          </div>

          <div className="tprof-actions no-print">
            <button type="button" className="btn btn-primary">
              <Icon name="mail" size={15} />
              درخواست راهنمایی
            </button>
            <button type="button" className="btn btn-outline" onClick={() => window.print()}>
              <Icon name="download" size={15} />
              دانلود CV
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
            >
              <Icon name="share" size={15} />
              اشتراک‌گذاری
            </button>
            <div className="tprof-contact-line">
              <span className="ltr">{teacher.email}</span>
              <span aria-hidden="true">·</span>
              <span>{teacher.phone}</span>
            </div>
          </div>
        </div>

        {/* نوار آمار علمی */}
        <div className="tprof-stats">
          {teacher.stats.map((s) => (
            <div key={s.label} className="tprof-stat">
              <span className="tprof-stat-num">{faNum(s.value)}</span>
              <span className="tprof-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ناوبری داخلی */}
        <nav className="tprof-anchors no-print" aria-label="دسترسی سریع">
          {[
            ["معرفی و پژوهش", "#t-bio"],
            ["مقالات", "#t-papers"],
            ["آموزش و پایان‌نامه‌ها", "#t-teach"],
            ["سوابق و افتخارات", "#t-record"],
            ["تماس", "#t-contact"],
          ].map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* بنر ظرفیت پذیرش */}
      <div className={`tprof-capacity${teacher.capacity.open ? " open" : ""}`} role="status">
        <span className="tprof-cap-dot" aria-hidden="true" />
        <div>
          <strong>{teacher.capacity.open ? "ظرفیت پذیرش دانشجو: باز" : "ظرفیت پذیرش: تکمیل"}</strong>
          <p>{teacher.capacity.text}</p>
        </div>
      </div>

      <div className="layout tprof-layout">
        {/* ستون اصلی */}
        <main className="col" aria-label="کارنامه علمی">
          <section className="card" id="t-bio" aria-labelledby="t-bio-t">
            <div className="section-head">
              <span className="section-icon tprof-icon">
                <Icon name="user" size={19} />
              </span>
              <h2 id="t-bio-t">بیوگرافی علمی</h2>
            </div>
            <p className="tprof-bio">{teacher.bio}</p>
            <h3 className="sub-title">زمینه‌های پژوهشی</h3>
            <div className="tags">
              {teacher.researchAreas.map((r) => (
                <span key={r} className="tag tag-cat">
                  {r}
                </span>
              ))}
            </div>
          </section>

          <section className="card" id="t-papers" aria-labelledby="t-papers-t">
            <div className="section-head">
              <span className="section-icon tprof-icon">
                <Icon name="book" size={19} />
              </span>
              <h2 id="t-papers-t">مقالات منتخب</h2>
              <span className="head-action tprof-count">{teacher.papers.length} مورد منتخب</span>
            </div>
            <div className="stack">
              {teacher.papers.map((p) => (
                <article key={p.title} className="item-box tprof-paper">
                  <div className="tprof-paper-top">
                    <h3>{p.title}</h3>
                    <span className="tag tag-cat">{p.tag}</span>
                  </div>
                  <p className="tl-sub">{p.authors}</p>
                  <div className="meta">
                    <span>
                      <Icon name="book" size={13} />
                      {p.venue}
                    </span>
                    <span>
                      <Icon name="calendar" size={13} />
                      {p.year}
                    </span>
                    <span>
                      <Icon name="star" size={13} />
                      {p.cites} استناد
                    </span>
                  </div>
                  <a className="tprof-doi ltr" href={p.doi} target="_blank" rel="noreferrer">
                    <Icon name="link" size={13} />
                    {p.doi.replace("https://", "")}
                  </a>
                </article>
              ))}
            </div>
            <button type="button" className="add-btn no-print">
              مشاهده همه مقالات در Google Scholar
              <Icon name="external" size={14} />
            </button>

            <h3 className="sub-title">کتب و فصول کتاب</h3>
            <div className="stack">
              {teacher.books.map((b) => (
                <div key={b.title} className="item-box">
                  <h3 style={{ fontSize: 14, fontWeight: 800 }}>{b.title}</h3>
                  <div className="meta">
                    <span>{b.role}</span>
                    <span>{b.publisher}</span>
                    <span>
                      <Icon name="calendar" size={13} />
                      {b.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="sub-title">طرح‌های پژوهشی</h3>
            <div className="stack">
              {teacher.projects.map((pr) => (
                <div key={pr.title} className="item-box">
                  <h3 style={{ fontSize: 14, fontWeight: 800 }}>{pr.title}</h3>
                  <div className="meta">
                    <span>
                      <Icon name="briefcase" size={13} />
                      {pr.sponsor} — نقش: {pr.role}
                    </span>
                    <span>
                      <Icon name="calendar" size={13} />
                      {pr.period}
                    </span>
                    <span className="tag">{pr.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card" id="t-teach" aria-labelledby="t-teach-t">
            <div className="section-head">
              <span className="section-icon tprof-icon">
                <Icon name="gradCap" size={19} />
              </span>
              <h2 id="t-teach-t">تدریس و پایان‌نامه‌ها</h2>
            </div>
            <h3 className="sub-title" style={{ marginTop: 0 }}>دروس</h3>
            <div className="tprof-table-wrap">
              <table className="tprof-table">
                <thead>
                  <tr>
                    <th>درس</th>
                    <th>کد</th>
                    <th>نیمسال / وضعیت</th>
                    <th>زمان</th>
                  </tr>
                </thead>
                <tbody>
                  {teacher.courses.map((c) => (
                    <tr key={c.code + c.title}>
                      <td style={{ fontWeight: 700 }}>{c.title}</td>
                      <td className="ltr">{c.code}</td>
                      <td>{c.term}</td>
                      <td>{c.time || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="sub-title">پایان‌نامه‌ها و رساله‌های تحت راهنمایی</h3>
            <div className="tprof-table-wrap">
              <table className="tprof-table">
                <thead>
                  <tr>
                    <th>دانشجو</th>
                    <th>مقطع</th>
                    <th>عنوان</th>
                    <th>سال / وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {teacher.theses.map((t) => (
                    <tr key={t.student + t.title}>
                      <td style={{ fontWeight: 700 }}>{t.student}</td>
                      <td>{t.level}</td>
                      <td>{t.title}</td>
                      <td>
                        <span className={`tprof-status${t.status === "در حال انجام" ? " doing" : " done"}`}>
                          {t.year} — {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card" id="t-record" aria-labelledby="t-record-t">
            <div className="section-head">
              <span className="section-icon tprof-icon">
                <Icon name="medal" size={19} />
              </span>
              <h2 id="t-record-t">تحصیلات، سوابق و افتخارات</h2>
            </div>
            <h3 className="sub-title" style={{ marginTop: 0 }}>تحصیلات</h3>
            <div className="timeline">
              {teacher.education.map((e) => (
                <div key={e.degree + e.year} className="tl-item">
                  <h3>{e.degree}</h3>
                  <p className="tl-sub">{e.university} — {e.year}</p>
                  {e.thesis ? <p className="tl-desc">{e.thesis}</p> : null}
                </div>
              ))}
            </div>

            <h3 className="sub-title">سوابق اجرایی و علمی</h3>
            <div className="stack">
              {teacher.executive.map((x) => (
                <div key={x.role} className="item-box">
                  <h3 style={{ fontSize: 14, fontWeight: 800 }}>{x.role}</h3>
                  <div className="meta">
                    <span>{x.org}</span>
                    <span>
                      <Icon name="calendar" size={13} />
                      {x.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid-2" style={{ marginTop: 6 }}>
              <div>
                <h3 className="sub-title">افتخارات و جوایز</h3>
                <ul className="bullet">
                  {teacher.honors.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="sub-title">عضویت در مجامع علمی</h3>
                <ul className="bullet">
                  {teacher.memberships.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>

        {/* ستون کناری */}
        <aside className="col" aria-label="اطلاعات تماس و پیوندها">
          <section className="card tprof-side-accent" id="t-contact" aria-labelledby="t-contact-t">
            <div className="section-head">
              <span className="section-icon tprof-icon">
                <Icon name="mail" size={19} />
              </span>
              <h2 id="t-contact-t">تماس رسمی</h2>
            </div>
            <div className="info-row">
              <span className="ic"><Icon name="mail" size={15} /></span>
              <div><span className="lbl">ایمیل دانشگاهی</span><span className="val ltr">{teacher.email}</span></div>
            </div>
            <div className="info-row">
              <span className="ic"><Icon name="phone" size={15} /></span>
              <div><span className="lbl">تلفن دفتر</span><span className="val">{teacher.phone}</span></div>
            </div>
            <div className="info-row">
              <span className="ic"><Icon name="mapPin" size={15} /></span>
              <div><span className="lbl">دفتر</span><span className="val">{teacher.office}</span></div>
            </div>
            <div className="info-row">
              <span className="ic"><Icon name="clock" size={15} /></span>
              <div><span className="lbl">ساعات مراجعه</span><span className="val">{teacher.officeHours}</span></div>
            </div>
            <div className="info-row">
              <span className="ic"><Icon name="hash" size={15} /></span>
              <div><span className="lbl">ORCID</span><span className="val ltr">{teacher.orcid}</span></div>
            </div>
            <button type="button" className="btn btn-outline btn-sm no-print" style={{ marginTop: 12, width: "100%" }}>
              <Icon name="calendar" size={14} />
              رزرو جلسه حضوری / مجازی
            </button>
          </section>

          <section className="card" aria-labelledby="t-links-t">
            <div className="section-head">
              <span className="section-icon tprof-icon">
                <Icon name="link" size={19} />
              </span>
              <h2 id="t-links-t">نمایه‌های علمی</h2>
            </div>
            <ScholarLinks />
          </section>

          <section className="card tprof-lab" aria-labelledby="t-lab-t">
            <div className="section-head">
              <span className="section-icon tprof-icon">
                <Icon name="users" size={19} />
              </span>
              <h2 id="t-lab-t">{teacher.lab.name}</h2>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 13.5 }}>{teacher.lab.desc}</p>
            <button type="button" className="btn btn-primary btn-sm no-print" style={{ marginTop: 12, width: "100%" }}>
              <Icon name="users" size={14} />
              مشاهده صفحه آزمایشگاه
            </button>
          </section>

          <section className="card no-print" aria-labelledby="t-edit-t">
            <div className="section-head">
              <span className="section-icon">
                <Icon name="pencil" size={19} />
              </span>
              <h2 id="t-edit-t">مدیریت صفحه</h2>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 13 }}>
              این نمای عمومی صفحه هیئت علمی است. ویرایش مقالات، پایان‌نامه‌ها و ظرفیت پذیرش از پنل اساتید انجام می‌شود.
            </p>
            <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 8 }}>
              <Icon name="pencil" size={14} />
              ورود به پنل ویرایش هیئت علمی
            </button>
          </section>
        </aside>
      </div>

      <footer className="footer">
        <span>صفحه رسمی هیئت علمی — {teacher.faculty}</span>
      </footer>
    </div>
  );
}
