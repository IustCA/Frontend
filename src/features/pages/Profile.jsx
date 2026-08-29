import { useEffect, useRef, useState } from "react";
import { ProfilePageSkeleton } from "../shared/PageLoader.jsx";
import { showToast } from "../shared/AppSlice";
import { useDispatch } from "react-redux";
import { useUserInfo } from "../hooks/useUserInfo";
import Header from "../components/userProfile/Header.jsx";
import CompletionProgress from "../components/userProfile/CompletionProgress.jsx";
import PersonalInfo from "../components/userProfile/PersonalInfo.jsx";
import Languages from "../components/userProfile/Languages.jsx";
import Skills from "../components/userProfile/Skills.jsx";
import Interests from "../components/userProfile/Interests.jsx";
import Contact from "../components/userProfile/Contact.jsx";
import About from "../components/userProfile/About.jsx";
import EducationalBackground from "../components/userProfile/EducationalBackground.jsx";
import JobExperience from "../components/userProfile/JobExperience.jsx";
import UniversityActivities from "../components/userProfile/UniversityActivities.jsx";
import Projects from "../components/userProfile/Projects.jsx";
import Certificates from "../components/userProfile/Certificates.jsx";
import Achievements from "../components/userProfile/Achievements.jsx";
import EditModeBar from "../components/userProfile/EditModeBar.jsx";
import ContactModal from "../components/userProfile/ContactModal.jsx";

/* ------------------------------ Constants ------------------------------- */
const FONT_CSS_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource-variable/vazirmatn@5.1.1/index.css";

const IMG_DASHBOARD =
  "https://image.qwenlm.ai/public_source/d4ae5256-6a4f-4e2a-b022-021cf3a0d064/1f17096a7-8080-4338-8554-b62db1d789a2.png";
const IMG_MOBILE =
  "https://image.qwenlm.ai/public_source/d4ae5256-6a4f-4e2a-b022-021cf3a0d064/191181357-05ef-41dc-a7ed-8875a3431772.png";
const IMG_CODE =
  "https://image.qwenlm.ai/public_source/d4ae5256-6a4f-4e2a-b022-021cf3a0d064/128dfc4ea-2ed8-41f1-90ce-529402d5167a.png";

/* --------------------------- Default sample data ------------------------ */
const DEFAULT_PROFILE = {
  personal: {
    fullName: "علی رضایی",
    title: "دانشجوی مهندسی کامپیوتر و توسعه‌دهنده فرانت‌اند",
    university: "دانشگاه تهران",
    field: "مهندسی کامپیوتر",
    semester: "ترم ششم",
    birthDate: "۱۳۸۲/۰۵/۱۴",
    studentId: "۴۰۰۱۲۳۴۵",
    email: "ali.rezaei@ut.ac.ir",
    phone: "۰۹۱۲ ۳۴۵ ۶۷۸۹",
    city: "تهران، ایران",
    linkedin: "linkedin.com/in/ali-rezaei",
    github: "github.com/alirezaei-dev",
    website: "",
    availability: "آماده همکاری",
    about:
      "دانشجوی ترم ششم مهندسی کامپیوتر در دانشگاه تهران هستم و تمرکز اصلی من بر توسعهٔ وب و طراحی رابط کاربری است۔ به ساخت محصولات دیجیتالِ کاربرپسند، دسترس‌پذیر و مقیاس‌پذیر علاقه دارم و در کنار درس، با انجام پروژه‌های عملی و فعالیت‌های دانشگاهی تجربهٔ خود را بیشتر کرده‌ام۔ نقطهٔ قوت من ترکیب مهارت فنی با حل مسئله و کار تیمی مؤثر است۔ هدف من شروع مسیر حرفه‌ای به‌عنوان توسعه‌دهندهٔ فرانت‌اند در یک تیم محصول است و از فرصت‌های کارآموزی و همکاری در پروژه‌های تیمی استقبال می‌کنم۔",
  },
  skills: [
    { id: "sk1", name: "React", level: "پیشرفته", category: "مهارت‌های فنی" },
    {
      id: "sk2",
      name: "HTML و CSS",
      level: "حرفه‌ای",
      category: "مهارت‌های فنی",
    },
    {
      id: "sk3",
      name: "طراحی واکنش‌گرا",
      level: "پیشرفته",
      category: "مهارت‌های فنی",
    },
    { id: "sk4", name: "REST API", level: "متوسط", category: "مهارت‌های فنی" },
    {
      id: "sk5",
      name: "JavaScript",
      level: "حرفه‌ای",
      category: "زبان‌های برنامه‌نویسی",
    },
    {
      id: "sk6",
      name: "TypeScript",
      level: "پیشرفته",
      category: "زبان‌های برنامه‌نویسی",
    },
    {
      id: "sk7",
      name: "Python",
      level: "متوسط",
      category: "زبان‌های برنامه‌نویسی",
    },
    {
      id: "sk8",
      name: "Git و GitHub",
      level: "پیشرفته",
      category: "ابزارها و نرم‌افزارها",
    },
    {
      id: "sk9",
      name: "Figma",
      level: "متوسط",
      category: "ابزارها و نرم‌افزارها",
    },
    {
      id: "sk10",
      name: "Tailwind CSS",
      level: "پیشرفته",
      category: "ابزارها و نرم‌افزارها",
    },
    {
      id: "sk11",
      name: "حل مسئله",
      level: "حرفه‌ای",
      category: "مهارت‌های نرم",
    },
    {
      id: "sk12",
      name: "کار تیمی",
      level: "پیشرفته",
      category: "مهارت‌های نرم",
    },
    {
      id: "sk13",
      name: "مدیریت زمان",
      level: "متوسط",
      category: "مهارت‌های نرم",
    },
  ],
  education: [
    {
      id: "ed1",
      degree: "کارشناسی",
      field: "مهندسی کامپیوتر",
      university: "دانشگاه تهران",
      startDate: "مهر ۱۴۰۱",
      endDate: "",
      ongoing: true,
      gpa: "۱۸٫۲",
      description:
        "تمرکز بر دروس نرم‌افزار و وب؛ عضو فعال انجمن علمی دانشکده و شرکت‌کنندهٔ مستمر کارگاه‌های فنی۔",
      courses: [
        "ساختمان داده",
        "طراحی الگوریتم‌ها",
        "پایگاه داده‌ها",
        "مهندسی نرم‌افزار",
        "هوش مصنوعی",
        "طراحی وب",
      ],
    },
    {
      id: "ed2",
      degree: "دیپلم",
      field: "ریاضی و فیزیک",
      university: "دبیرستان علامه حلی، تهران",
      startDate: "مهر ۱۳۹۷",
      endDate: "خرداد ۱۴۰۱",
      ongoing: false,
      gpa: "۱۹٫۱",
      description:
        "رتبهٔ برتر کنکور سراسری ریاضی و عضو تیم المپیاد برنامه‌نویسی مدرسه۔",
      courses: [],
    },
  ],
  experiences: [
    {
      id: "ex1",
      jobTitle: "کارآموز توسعهٔ فرانت‌اند",
      company: "شرکت فناوری آریاتک",
      type: "کارآموزی",
      startDate: "تیر ۱۴۰۳",
      endDate: "اسفند ۱۴۰۳",
      ongoing: false,
      location: "تهران",
      description:
        "همکاری با تیم محصول در توسعهٔ پنل وب مشتریان و بهبود تجربهٔ کاربری۔",
      responsibilities: [
        "توسعهٔ کامپوننت‌های واکنش‌گرا با React",
        "مشارکت در بازبینی کد و افزایش کیفیت خروجی",
        "بهینه‌سازی سرعت بارگذاری صفحات",
      ],
      skillsUsed: ["React", "TypeScript", "Git"],
    },
    {
      id: "ex2",
      jobTitle: "توسعه‌دهندهٔ فرانت‌اند",
      company: "استارتاپ درس‌یار",
      type: "پروژه‌ای",
      startDate: "فروردین ۱۴۰۳",
      endDate: "خرداد ۱۴۰۳",
      ongoing: false,
      location: "دورکاری",
      description:
        "طراحی و پیاده‌سازی رابط کاربری سامانهٔ یادگیری آنلاین از روی طرح‌های فیگما۔",
      responsibilities: [
        "پیاده‌سازی طراحی واکنش‌گرا و دسترس‌پذیر",
        "اتصال رابط به سرویس‌های REST",
      ],
      skillsUsed: ["React", "Tailwind CSS", "REST API"],
    },
  ],
  activities: [
    {
      id: "ac1",
      title: "انجمن علمی دانشکدهٔ مهندسی کامپیوتر",
      organization: "دانشگاه تهران",
      role: "عضو کمیتهٔ فنی",
      date: "مهر ۱۴۰۲ تا اکنون",
      description:
        "برنامه‌ریزی و اجرای کارگاه‌ها و رویدادهای فنی برای دانشجویان دانشکده۔",
      achievements:
        "برگزاری ۴ کارگاه آموزشی توسعهٔ وب با بیش از ۲۰۰ شرکت‌کننده",
    },
    {
      id: "ac2",
      title: "دستیاری آموزشی درس طراحی وب",
      organization: "دانشکدهٔ مهندسی کامپیوتر",
      role: "دستیار آموزشی",
      date: "بهمن ۱۴۰۳ تا اکنون",
      description:
        "همکاری با استاد درس در طراحی تمرین‌ها، رفع اشکال و ارزیابی پروژه‌های دانشجویی۔",
      achievements: "انتخاب به‌عنوان دستیار آموزشی برتر نیم‌سال",
    },
    {
      id: "ac3",
      title: "مسابقهٔ برنامه‌نویسی ICPC منطقه‌ای",
      organization: "تیم دانشگاه تهران",
      role: "عضو تیم",
      date: "آذر ۱۴۰۳",
      description:
        "حضور در مسابقهٔ منطقه‌ای برنامه‌نویسی دانشگاهی در قالب تیم سه‌نفره۔",
      achievements: "کسب رتبهٔ ۱۲ از میان ۲۰۰ تیم شرکت‌کننده",
    },
  ],
  projects: [
    {
      id: "pr1",
      title: "وب‌اپ مدیریت پروژهٔ دانشجویی «تسک‌یاب»",
      description:
        "سامانهٔ مدیریت وظایف برای تیم‌های دانشجویی با تابلوی کانبان، یادآور سررسیدها و گزارش پیشرفت پروژه۔",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
      category: "تیمی",
      startDate: "فروردین ۱۴۰۳",
      endDate: "دی ۱۴۰۳",
      github: "https://github.com/alirezaei-dev/taskyab",
      demo: "https://taskyab.example.com",
      image: IMG_MOBILE,
      team: "تیمی",
    },
    {
      id: "pr2",
      title: "داشبورد تحلیل دادهٔ آموزشی",
      description:
        "داشبورد نمایش آمار نمرات و پیشرفت تحصیلی دانشجویان با نمودارهای تعاملی و خروجی گزارش۔",
      technologies: ["React", "Recharts", "REST API"],
      category: "دانشگاهی",
      startDate: "مهر ۱۴۰۳",
      endDate: "بهمن ۱۴۰۳",
      github: "https://github.com/alirezaei-dev/edu-dashboard",
      demo: "https://edu-dash.example.com",
      image: IMG_DASHBOARD,
      team: "فردی",
    },
    {
      id: "pr3",
      title: "کتابخانهٔ متن‌باز تقویم شمسی",
      description:
        "کتابخانهٔ سبک و بدون وابستگی برای تبدیل تاریخ میلادی و شمسی همراه با کامپوننت آمادهٔ React۔",
      technologies: ["TypeScript", "React"],
      category: "متن‌باز",
      startDate: "تیر ۱۴۰۲",
      endDate: "در حال توسعه",
      github: "https://github.com/alirezaei-dev/shamsi-date",
      demo: "",
      image: IMG_CODE,
      team: "فردی",
    },
  ],
  certificates: [
    {
      id: "ce1",
      name: "دورهٔ جامع React پیشرفته",
      issuer: "آکادمی سبزلرن",
      date: "خرداد ۱۴۰۳",
      credentialId: "SBZ-1403-8821",
      link: "https://sabzlearn.ir",
      description:
        "دورهٔ تخصصی React شامل هوک‌ها، مدیریت حالت و بهینه‌سازی عملکرد۔",
    },
    {
      id: "ce2",
      name: "دورهٔ طراحی رابط کاربری",
      issuer: "کوئرا کالج",
      date: "آبان ۱۴۰۲",
      credentialId: "QRC-1402-4470",
      link: "https://quera.ir",
      description: "اصول طراحی UI/UX، کار با Figma و طراحی سیستم‌های طراحی۔",
    },
  ],
  achievements: [
    {
      id: "ah1",
      title: "رتبهٔ دوم هکاتون دانشجویی کدفست",
      type: "هکاتون",
      date: "آذر ۱۴۰۳",
      description:
        "ارائهٔ راه‌حل نوآورانهٔ وب در حوزهٔ آموزش در قالب تیم چهارنفره طی ۴۸ ساعت۔",
    },
    {
      id: "ah2",
      title: "دانشجوی برتر دانشکدهٔ مهندسی کامپیوتر",
      type: "دانشجوی نمونه",
      date: "مهر ۱۴۰۳",
      description:
        "کسب عنوان دانشجوی برتر به دلیل معدل ممتاز و فعالیت‌های علمی۔",
    },
    {
      id: "ah3",
      title: "پذیرش مقاله در کنفرانس ملی نرم‌افزار",
      type: "مقاله پژوهشی",
      date: "اردیبهشت ۱۴۰۴",
      description:
        "مقالهٔ مشترک با موضوع بهبود تجربهٔ کاربری سامانه‌های دانشگاهی۔",
    },
  ],
  languages: [
    { id: "lg1", name: "فارسی", level: "زبان مادری" },
    { id: "lg2", name: "انگلیسی", level: "متوسط" },
    { id: "lg3", name: "آلمانی", level: "مقدماتی" },
  ],
  interests: [
    "طراحی رابط کاربری",
    "هوش مصنوعی",
    "توسعه وب",
    "مطالعه",
    "عکاسی",
    "فعالیت‌های داوطلبانه",
  ],
};

/* ------------------------------- Utilities ------------------------------ */
const uid = () => "id-" + Math.random().toString(36).slice(2, 9);
const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || "").trim());
const clone = (obj) => JSON.parse(JSON.stringify(obj));
const dateRange = (start, end, ongoing) => {
  if (!start) return "";
  if (ongoing) return `${start} تا اکنون`;
  if (end) return `${start} تا ${end}`;
  return start;
};

const loadProfile = function () {
  return clone(DEFAULT_PROFILE);
};

/* ------------------------------ Global CSS ------------------------------ */
const CSS = `
:root{
  --bg:#f4f5fb; --card:#fff; --ink:#1c2440; --muted:#68718c;
  --line:#e7eaf4; --accent:#4f46e5; --accent-2:#7c3aed; --accent-soft:#eef0ff;
  --green:#0a8a5f; --green-soft:#e9f9f2; --red:#dc2626; --red-soft:#fef2f2;
  --radius:18px; --shadow:0 1px 2px rgba(23,26,64,.05),0 10px 28px rgba(23,26,64,.07);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:'Vazirmatn Variable','Vazirmatn',Tahoma,Arial,sans-serif;font-size:15px;line-height:1.8}
img{max-width:100%;display:block}
button{font:inherit;color:inherit;cursor:pointer}
h1,h2,h3,h4,p{margin:0}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:8px}
.ltr{direction:ltr;unicode-bidi:isolate}
.app{max-width:1180px;margin:0 auto;padding:22px 18px 120px}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:12px;border:1px solid transparent;padding:10px 16px;font-size:14px;font-weight:600;transition:all .18s ease;min-height:42px;text-decoration:none}
.btn-primary{background:var(--accent);color:#fff;box-shadow:0 6px 16px rgba(79,70,229,.28)}
.btn-primary:hover{background:#4338ca;transform:translateY(-1px)}
.btn-outline{background:#fff;border-color:#d8dcec;color:var(--ink)}
.btn-outline:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-soft)}
.btn-ghost{background:transparent;color:var(--muted)}
.btn-ghost:hover{background:#eef0f6;color:var(--ink)}
.btn-sm{padding:7px 12px;font-size:13px;min-height:36px;border-radius:10px}
.icon-btn{display:inline-grid;place-items:center;width:36px;height:36px;border-radius:10px;border:1px solid #dfe3ef;background:#fff;color:var(--muted);transition:all .15s}
.icon-btn:hover{color:var(--accent);border-color:var(--accent);background:var(--accent-soft)}
.icon-btn.danger:hover{color:var(--red);border-color:var(--red);background:var(--red-soft)}
.add-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;border:1.5px dashed #c9cfe6;background:transparent;border-radius:14px;padding:11px;color:var(--accent);font-weight:600;font-size:13.5px;margin-top:12px;transition:all .15s}
.add-btn:hover{background:var(--accent-soft);border-color:var(--accent)}

.header-card{padding:0;overflow:hidden}
.cover{height:150px;background:linear-gradient(115deg,#4f46e5 0%,#7c3aed 55%,#a855f7 100%);position:relative}
.cover::after{content:'';position:absolute;inset:0;background:radial-gradient(220px 110px at 85% 20%,rgba(255,255,255,.25),transparent 70%),radial-gradient(260px 130px at 15% 90%,rgba(255,255,255,.18),transparent 70%)}
.header-body{padding:0 26px 26px;display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start}
.avatar-wrap{margin-top:-52px}
.avatar{position:relative;width:118px;height:118px;border-radius:50%;border:4px solid #fff;box-shadow:0 8px 24px rgba(23,26,64,.18);overflow:hidden;background:linear-gradient(135deg,#c7d2fe,#ddd6fe);display:grid;place-items:center;color:var(--accent);font-size:40px;font-weight:800}
.avatar img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.header-info{flex:1;min-width:260px;padding-top:14px}
.header-info h1{font-size:25px;font-weight:800;letter-spacing:-.2px;overflow-wrap:anywhere}
.header-title{color:var(--accent);font-weight:700;font-size:14.5px;margin-top:2px}
.meta-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.chip{display:inline-flex;align-items:center;gap:6px;background:#f2f4fb;border:1px solid #e6e9f4;border-radius:999px;padding:4px 12px;font-size:12.5px;color:#414a6b}
.chip svg{color:var(--accent)}
.badge-avail{display:inline-flex;align-items:center;gap:6px;background:var(--green-soft);border:1px solid #b5e8d4;color:var(--green);border-radius:999px;padding:4px 12px;font-size:12.5px;font-weight:700}
.badge-avail .dot{width:8px;height:8px;border-radius:50%;background:var(--green);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(10,138,95,.35)}50%{box-shadow:0 0 0 5px rgba(10,138,95,0)}}
.header-intro{color:var(--muted);margin-top:12px;max-width:660px;font-size:14px}
.header-actions{display:flex;gap:10px;flex-wrap:wrap;padding-top:18px;margin-inline-start:auto}

.layout{display:grid;grid-template-columns:330px minmax(0,1fr);gap:22px;margin-top:22px;align-items:start}
.col{display:flex;flex-direction:column;gap:22px;min-width:0}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px}
.section-head{display:flex;align-items:center;gap:10px;margin-bottom:16px}
.section-head h2{font-size:16.5px;font-weight:800}
.section-icon{width:38px;height:38px;border-radius:12px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;flex-shrink:0}
.head-action{margin-inline-start:auto}

.field{margin-bottom:13px;min-width:0}
.field label{display:block;font-size:12.5px;font-weight:700;color:#3d4664;margin-bottom:5px}
.input{width:100%;border:1px solid #d9deee;border-radius:12px;padding:9px 12px;font:inherit;font-size:14px;background:#fbfcff;color:var(--ink);transition:border .15s,box-shadow .15s}
.input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(79,70,229,.13);background:#fff}
.input.err{border-color:var(--red)}
textarea.input{resize:vertical;min-height:88px}
.err-msg{display:flex;align-items:center;gap:5px;color:var(--red);font-size:12px;margin-top:5px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}
.form-box{background:#f8f9ff;border:1px solid #e3e7f8;border-radius:14px;padding:14px;margin:10px 0}
.form-actions{display:flex;gap:8px;margin-top:4px;flex-wrap:wrap}
.check-row{display:flex;align-items:center;gap:8px;font-size:13.5px;margin:2px 0 10px;cursor:pointer}
.check-row input{width:17px;height:17px;accent-color:var(--accent)}

.info-row{display:flex;align-items:center;gap:10px;padding:7px 0;font-size:13.5px;color:#3d4664;border-bottom:1px dashed #edeff7}
.info-row:last-of-type{border-bottom:none}
.info-row .ic{width:32px;height:32px;border-radius:10px;background:#f2f4fb;color:var(--accent);display:grid;place-items:center;flex-shrink:0}
.info-row .val{overflow-wrap:anywhere}
.info-row .lbl{color:var(--muted);font-size:12px;display:block}

.sub-title{font-size:13px;font-weight:800;color:#3d4664;margin:14px 0 8px}
.skill-row{padding:6px 0}
.skill-top{display:flex;justify-content:space-between;align-items:center;font-size:13.5px;font-weight:600;margin-bottom:5px;gap:8px}
.skill-level{font-size:11.5px;color:var(--accent);background:var(--accent-soft);border-radius:999px;padding:1px 10px;white-space:nowrap}
.progress{height:7px;background:#edeff7;border-radius:99px;overflow:hidden}
.progress>span{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--accent),var(--accent-2))}

.tags{display:flex;flex-wrap:wrap;gap:8px}
.tag{display:inline-flex;align-items:center;gap:6px;background:#f2f4fb;border:1px solid #e6e9f4;border-radius:999px;padding:4px 12px;font-size:12.5px;color:#414a6b}
.tag button{border:none;background:transparent;color:var(--muted);display:grid;place-items:center;padding:0;border-radius:50%}
.tag button:hover{color:var(--red)}
.tag-cat{background:var(--accent-soft);border-color:#dcdffd;color:var(--accent);font-weight:700}

.timeline{position:relative;padding-inline-start:30px;display:flex;flex-direction:column;gap:18px}
.timeline::before{content:'';position:absolute;inset-inline-start:10px;top:8px;bottom:8px;width:2px;background:#e4e7f3;border-radius:2px}
.tl-item{position:relative}
.tl-item::before{content:'';position:absolute;inset-inline-start:-26px;top:7px;width:12px;height:12px;border-radius:50%;background:#fff;border:3px solid var(--accent);box-shadow:0 0 0 3px #fff}
.tl-item h3{font-size:15px;font-weight:800}
.tl-sub{color:var(--accent);font-size:13px;font-weight:700;margin-top:1px}
.meta{display:flex;flex-wrap:wrap;gap:6px 14px;color:var(--muted);font-size:12.5px;margin-top:6px}
.meta span{display:inline-flex;align-items:center;gap:5px}
.tl-desc{color:var(--muted);font-size:13.5px;margin-top:8px}
.bullet{margin:8px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:4px}
.bullet li{position:relative;padding-inline-start:16px;color:var(--muted);font-size:13.5px}
.bullet li::before{content:'';position:absolute;inset-inline-start:2px;top:.72em;width:7px;height:7px;border-radius:50%;background:var(--accent-2)}

.item-box{position:relative;border:1px solid #eceef8;border-radius:14px;padding:14px 16px;background:#fdfdff;transition:box-shadow .15s}
.item-box:hover{box-shadow:0 6px 18px rgba(23,26,64,.07)}
.item-tools{position:absolute;top:10px;inset-inline-end:10px;display:flex;gap:6px;z-index:2}
.stack{display:flex;flex-direction:column;gap:14px}

.project-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}
.project-card{position:relative;border:1px solid #eceef8;border-radius:16px;overflow:hidden;background:#fff;display:flex;flex-direction:column;transition:transform .18s,box-shadow .18s}
.project-card:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(23,26,64,.12)}
.project-img{height:140px;background:linear-gradient(120deg,#e0e7ff,#ede9fe);position:relative;overflow:hidden}
.project-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ph-icon{position:absolute;inset:0;display:grid;place-items:center;color:var(--accent)}
.project-body{padding:16px;display:flex;flex-direction:column;gap:10px;flex:1}
.proj-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}
.proj-top h3{font-size:14.5px;font-weight:800}
.project-desc{color:var(--muted);font-size:13px;flex:1}
.proj-links{display:flex;gap:8px;flex-wrap:wrap}

.empty{border:1.5px dashed #d6dbec;border-radius:14px;padding:26px 16px;text-align:center;color:var(--muted);font-size:13.5px;display:flex;flex-direction:column;gap:12px;align-items:center}

.completion-num{font-size:20px;font-weight:800;color:var(--accent)}
.suggest{margin:10px 0 0;padding:0;display:flex;flex-direction:column;gap:6px}
.suggest li{display:flex;gap:7px;align-items:center;font-size:12.5px;color:#7a5b13;background:#fff8e6;border:1px solid #f3e3ae;border-radius:10px;padding:6px 10px;list-style:none}

.modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);backdrop-filter:blur(3px);display:grid;place-items:center;z-index:70;padding:16px;animation:fadeIn .18s ease}
.modal{background:#fff;border-radius:20px;width:min(520px,100%);max-height:88vh;overflow:auto;padding:24px;animation:slideUp .22s ease}
.modal-head{display:flex;align-items:center;gap:10px;margin-bottom:16px}
.modal-head h2{font-size:17px;font-weight:800;flex:1}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{transform:translateY(14px);opacity:0}to{transform:none;opacity:1}}
.success-box{text-align:center;padding:26px 10px;display:flex;flex-direction:column;align-items:center;gap:12px}
.success-box .big{width:64px;height:64px;border-radius:50%;background:var(--green-soft);color:var(--green);display:grid;place-items:center}

.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#141a33;color:#fff;padding:11px 22px;border-radius:12px;z-index:90;box-shadow:0 10px 30px rgba(0,0,0,.3);font-size:13.5px;display:flex;gap:8px;align-items:center;animation:slideUp .2s ease;max-width:calc(100% - 32px)}
.toast.ok svg{color:#34d399}
.toast.err svg{color:#f87171}

.edit-bar{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:10px;background:#fff;padding:10px 14px;border-radius:16px;box-shadow:0 14px 40px rgba(23,26,64,.22);border:1px solid var(--line);z-index:60;width:min(560px,calc(100% - 28px));justify-content:space-between;flex-wrap:wrap}
.edit-bar .hint{font-size:12.5px;color:var(--muted);display:flex;align-items:center;gap:7px}

.footer{margin-top:26px;text-align:center;color:var(--muted);font-size:12.5px;display:flex;flex-direction:column;gap:10px;align-items:center}

@media(max-width:1020px){
  .layout{grid-template-columns:1fr}
  .header-actions{margin-inline-start:0;width:100%}
}
@media(max-width:560px){
  .app{padding:14px 12px 130px}
  .header-body{padding:0 16px 20px}
  .avatar{width:96px;height:96px}
  .avatar-wrap{margin-top:-44px}
  .header-info h1{font-size:21px}
  .grid-2{grid-template-columns:1fr}
  .card{padding:18px}
  .header-actions .btn{flex:1}
}
@media print{
  .no-print,.edit-bar,.toast,.modal-overlay{display:none!important}
  body{background:#fff}
  .layout{grid-template-columns:1fr}
  .card{box-shadow:none;break-inside:avoid}
}
`;

export default function Profile() {
  const dispatch = useDispatch();
  const { isLoading } = useUserInfo();
  const [profile, setProfile] = useState(loadProfile);
  const [editMode, setEditMode] = useState(false);
  const [editing, setEditing] = useState(null);
  const [personalErrors, setPersonalErrors] = useState({});
  const [contactOpen, setContactOpen] = useState(false);
  const backupRef = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    document.documentElement.lang = "fa";
    document.documentElement.dir = "rtl";
  }, []);

  useEffect(() => {
    document.title =
      (profile.personal.fullName || "پروفایل") + " | رزومهٔ دانشجویی";
  }, [profile.personal.fullName]);

  useEffect(() => {
    const existing = document.getElementById("vazirmatn-font");
    if (!existing) {
      const link = document.createElement("link");
      link.id = "vazirmatn-font";
      link.rel = "stylesheet";
      link.href = FONT_CSS_URL;
      document.head.appendChild(link);
    }
  }, []);

  const updatePersonal = (key, value) =>
    setProfile((prev) => ({
      ...prev,
      personal: { ...prev.personal, [key]: value },
    }));

  const saveItem = (section, id, data) => {
    setProfile((prev) => {
      const list = prev[section] || [];
      if (id === "new")
        return { ...prev, [section]: [...list, { ...data, id: uid() }] };
      return {
        ...prev,
        [section]: list.map((it) => (it.id === id ? { ...it, ...data } : it)),
      };
    });
    setEditing(null);
    dispatch(showToast(toastTimer, "با موفقیت ذخیره شد۔"));
  };

  const removeItem = (section, id) => {
    if (!window.confirm("آیا از حذف این مورد مطمئن هستید؟")) return;
    setProfile((prev) => ({
      ...prev,
      [section]: (prev[section] || []).filter((it) => it.id !== id),
    }));
    setEditing(null);
    dispatch(showToast(toastTimer, "مورد موردنظر حذف شد۔"));
  };

  const saveProfile = () => {
    const e = {};
    const pr = profile.personal;
    if (!pr.fullName.trim()) e.fullName = "نام و نام خانوادگی الزامی است۔";
    if (!pr.title.trim()) e.title = "عنوان حرفه‌ای الزامی است۔";
    if (!pr.email.trim()) e.email = "ایمیل الزامی است۔";
    else if (!isValidEmail(pr.email)) e.email = "ایمیل واردشده معتبر نیست۔";
    setPersonalErrors(e);
    if (Object.keys(e).length) {
      dispatch(showToast(toastTimer, "لطفاً خطاهای فرم را برطرف کنید۔", "err"));
      return;
    }
    setEditMode(false);
    setEditing(null);
    backupRef.current = null;
    dispatch(showToast(toastTimer, "تغییرات پروفایل با موفقیت ذخیره شد۔"));
  };

  const cancelProfile = () => {
    if (backupRef.current) setProfile(backupRef.current);
    backupRef.current = null;
    setEditMode(false);
    setEditing(null);
    setPersonalErrors({});
  };

  const p = profile.personal;
  const isFormOpen = (section, id) =>
    !!editing && editing.section === section && editing.id === id;
  const startEdit = (section, id) => setEditing({ section, id });

  if (isLoading) {
    return (
      <div dir="rtl" className="app">
        <style>{CSS}</style>
        <ProfilePageSkeleton />
      </div>
    );
  }

  return (
    <div dir="rtl" className="app">
      <style>{CSS}</style>

      <Header
        p={p}
        editMode={editMode}
        personalErrors={personalErrors}
        updatePersonal={updatePersonal}
        saveProfile={saveProfile}
        clone={clone}
        toastTimer={toastTimer}
        profile={profile}
        backupRef={backupRef}
        setPersonalErrors={setPersonalErrors}
        setEditMode={setEditMode}
        cancelProfile={cancelProfile}
      />

      <div className="layout">
        <aside className="col" aria-label="اطلاعات جانبی">
          <CompletionProgress profile={profile} isValidEmail={isValidEmail} />
          <PersonalInfo
            editMode={editMode}
            p={p}
            updatePersonal={updatePersonal}
            personalErrors={personalErrors}
          />
          <Languages
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            setEditing={setEditing}
            removeItem={removeItem}
          />
          <Skills
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            setEditing={setEditing}
            removeItem={removeItem}
          />
          <Interests
            profile={profile}
            editMode={editMode}
            setProfile={setProfile}
          />
          <Contact p={p} setContactOpen={setContactOpen} />
        </aside>

        <main className="col" aria-label="محتوای اصلی رزومه">
          <About editMode={editMode} p={p} updatePersonal={updatePersonal} />
          <EducationalBackground
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            setEditing={setEditing}
            removeItem={removeItem}
            dateRange={dateRange}
          />
          <JobExperience
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            setEditing={setEditing}
            dateRange={dateRange}
          />
          <UniversityActivities
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            setEditing={setEditing}
          />
          <Projects
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            setEditing={setEditing}
            removeItem={removeItem}
            dateRange={dateRange}
          />
          <Certificates
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            setEditing={setEditing}
            removeItem={removeItem}
          />
          <Achievements
            profile={profile}
            isFormOpen={isFormOpen}
            editMode={editMode}
            startEdit={startEdit}
            saveItem={saveItem}
            setEditing={setEditing}
            removeItem={removeItem}
          />
        </main>
      </div>

      <EditModeBar
        editMode={editMode}
        saveProfile={saveProfile}
        cancelProfile={cancelProfile}
      />
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        showToast={showToast}
        toastTimer={toastTimer}
        isValidEmail={isValidEmail}
      />
    </div>
  );
}
