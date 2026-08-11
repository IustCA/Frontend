import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------ Constants ------------------------------- */
const STORAGE_KEY = "student-profile-resume-v1";
const FONT_CSS_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource-variable/vazirmatn@5.1.1/index.css";

const LEVELS = ["مقدماتی", "متوسط", "پیشرفته", "حرفه‌ای"];
const LEVEL_PCT = {
  مقدماتی: "30%",
  متوسط: "55%",
  پیشرفته: "80%",
  حرفه‌ای: "100%",
};
const LANG_LEVELS = ["زبان مادری", "مقدماتی", "متوسط", "پیشرفته", "حرفه‌ای"];
const SKILL_CATEGORIES = [
  "مهارت‌های فنی",
  "زبان‌های برنامه‌نویسی",
  "ابزارها و نرم‌افزارها",
  "مهارت‌های نرم",
];
const EMPLOYMENT_TYPES = [
  "تمام‌وقت",
  "پاره‌وقت",
  "کارآموزی",
  "پروژه‌ای",
  "دورکاری",
  "داوطلبانه",
];
const PROJECT_CATEGORIES = ["دانشگاهی", "شخصی", "تیمی", "پژوهشی", "متن‌باز"];
const ACHIEVEMENT_TYPES = [
  "جایزه تحصیلی",
  "رتبه مسابقه",
  "بورسیه",
  "هکاتون",
  "مقاله پژوهشی",
  "دستاورد پژوهشی",
  "دانشجوی نمونه",
];
const AVAILABILITY_OPTIONS = [
  "آماده همکاری",
  "آماده کارآموزی",
  "فقط پروژه‌های دانشجویی",
  "در حال حاضر در دسترس نیستم",
];
const TEAM_OPTIONS = ["فردی", "تیمی"];

const IMG_AVATAR =
  "https://image.qwenlm.ai/public_source/d4ae5256-6a4f-4e2a-b022-021cf3a0d064/14cd1e56b-e87c-4b3d-8281-bcbb64951014.png";
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
const faNum = (value) => Number(value || 0).toLocaleString("fa-IR");
const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || "").trim());
const clone = (obj) => JSON.parse(JSON.stringify(obj));
const firstSentence = (text) => {
  const t = String(text || "").trim();
  const idx = t.indexOf("۔");
  return idx > 0 ? t.slice(0, idx + 1) : t;
};
const dateRange = (start, end, ongoing) => {
  if (!start) return "";
  if (ongoing) return `${start} تا اکنون`;
  if (end) return `${start} تا ${end}`;
  return start;
};

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(DEFAULT_PROFILE);
    const saved = JSON.parse(raw);
    return {
      ...clone(DEFAULT_PROFILE),
      ...saved,
      personal: { ...DEFAULT_PROFILE.personal, ...(saved.personal || {}) },
    };
  } catch {
    return clone(DEFAULT_PROFILE);
  }
}

/* --------------------------------- Icons -------------------------------- */
const ICON_PATHS = {
  user: [
    "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
    "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  ],
  mail: [
    "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
  ],
  phone: [
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  ],
  mapPin: [
    "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",
    "M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  ],
  calendar: [
    "M8 2v4",
    "M16 2v4",
    "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    "M3 10h18",
  ],
  hash: ["M4 9h16", "M4 15h16", "M10 3 8 21", "M16 3l-2 18"],
  linkedin: [
    "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
    "M2 9h4v12H2z",
    "M6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
  ],
  github: [
    "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
    "M9 18c-4.51 2-5-2-7-2",
  ],
  globe: [
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
    "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
    "M2 12h20",
  ],
  pencil: ["M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"],
  download: [
    "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
    "m7 10 5 5 5-5",
    "M12 15V3",
  ],
  share: [
    "M21 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    "M9 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    "M21 19a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    "m8.59 13.51 6.83 3.98",
    "m15.41 6.51-6.82 3.98",
  ],
  plus: ["M5 12h14", "M12 5v14"],
  trash: [
    "M3 6h18",
    "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
    "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
    "M10 11v6",
    "M14 11v6",
  ],
  x: ["M18 6 6 18", "m6 6 12 12"],
  check: ["M20 6 9 17l-5-5"],
  gradCap: [
    "M21.42 10.92a1 1 0 0 0 0-1.84l-8.58-3.91a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0z",
    "M22 10v6",
    "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
  ],
  briefcase: [
    "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
    "M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
  ],
  award: [
    "M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z",
    "M15.48 12.89 17 22l-5-3-5 3 1.52-9.11",
  ],
  folder: [
    "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
  ],
  book: [
    "M12 7v14",
    "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
  ],
  star: [
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  ],
  languages: [
    "m5 8 6 6",
    "m4 14 6-6 2-3",
    "M2 5h12",
    "M7 2h1",
    "m22 22-5-10-5 10",
    "M14 18h6",
  ],
  heart: [
    "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  ],
  users: [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    "M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    "M22 21v-2a4 4 0 0 0-3-3.87",
    "M16 3.13a4 4 0 0 1 0 7.75",
  ],
  clock: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M12 6v6l4 2"],
  link: [
    "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
    "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  ],
  rotate: ["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", "M3 3v5h5"],
  alert: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M12 8v4", "M12 16h.01"],
  external: [
    "M15 3h6v6",
    "M10 14 21 3",
    "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
  ],
  sparkles: [
    "M9.94 15.5 8.5 14.06 2.36 12.48a.5.5 0 0 1 0-.96L8.5 9.94l1.44-1.44 1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14 1.44 1.44 6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58-1.44 1.44-1.58 6.14a.5.5 0 0 1-.96 0z",
    "M20 3v4",
    "M22 5h-4",
  ],
  send: ["m22 2-7 20-4-9-9-4Z", "M22 2 11 13"],
  medal: [
    "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
    "M11 12 5.12 2.2",
    "m13 12 5.88-9.8",
    "M8 7h8",
    "M12 12a5 5 0 1 0 0 10 5 5 0 0 0 0-10z",
  ],
  circleCheck: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "m9 12 2 2 4-4"],
  rocket: [
    "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
    "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
    "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",
    "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
  ],
};

function Icon({ name, size = 18 }) {
  const paths = ICON_PATHS[name] || [];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

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

/* ---------------------------- Small primitives --------------------------- */
function Field({ id, label, required, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      {children}
      {error ? (
        <p className="err-msg" role="alert">
          <Icon name="alert" size={13} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FormActions({ onSave, onCancel }) {
  return (
    <div className="form-actions">
      <button type="button" className="btn btn-primary btn-sm" onClick={onSave}>
        <Icon name="check" size={15} />
        ذخیره
      </button>
      <button type="button" className="btn btn-ghost btn-sm" onClick={onCancel}>
        <Icon name="x" size={15} />
        انصراف
      </button>
    </div>
  );
}

function AddButton({ onClick, label }) {
  return (
    <button type="button" className="add-btn no-print" onClick={onClick}>
      <Icon name="plus" size={16} />
      {label}
    </button>
  );
}

function EmptyState({ text, onAdd, addLabel }) {
  return (
    <div className="empty">
      <p>{text}</p>
      {onAdd ? (
        <button
          type="button"
          className="btn btn-outline btn-sm no-print"
          onClick={onAdd}
        >
          <Icon name="plus" size={15} />
          {addLabel || "افزودن"}
        </button>
      ) : null}
    </div>
  );
}

function SectionCard({ icon, title, titleId, action, children }) {
  return (
    <section className="card" aria-labelledby={titleId}>
      <div className="section-head">
        <span className="section-icon">
          <Icon name={icon} size={19} />
        </span>
        <h2 id={titleId}>{title}</h2>
        {action ? <div className="head-action">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

function EditableItem({ editMode, onEdit, onDelete, children }) {
  return (
    <div className="item-box">
      {editMode ? (
        <div className="item-tools no-print">
          <button
            type="button"
            className="icon-btn"
            aria-label="ویرایش این مورد"
            onClick={onEdit}
          >
            <Icon name="pencil" size={15} />
          </button>
          <button
            type="button"
            className="icon-btn danger"
            aria-label="حذف این مورد"
            onClick={onDelete}
          >
            <Icon name="trash" size={15} />
          </button>
        </div>
      ) : null}
      {children}
    </div>
  );
}

function TagInput({ id, label, value, onChange, placeholder }) {
  const [draft, setDraft] = useState("");
  const addTag = () => {
    const t = draft.trim();
    if (!t) return;
    if (!value.includes(t)) onChange([...value, t]);
    setDraft("");
  };
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          id={id}
          className="input"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <button
          type="button"
          className="btn btn-outline btn-sm"
          style={{ minHeight: 42 }}
          onClick={addTag}
        >
          <Icon name="plus" size={15} />
          افزودن
        </button>
      </div>
      {value.length > 0 ? (
        <div className="tags" style={{ marginTop: 8 }}>
          {value.map((t, i) => (
            <span className="tag" key={t + "-" + i}>
              {t}
              <button
                type="button"
                aria-label={"حذف " + t}
                onClick={() => onChange(value.filter((v) => v !== t))}
              >
                <Icon name="x" size={13} />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------- Forms ---------------------------------- */
function SkillForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? { ...initial }
      : { name: "", level: "متوسط", category: SKILL_CATEGORIES[0] },
  );
  const [err, setErr] = useState("");
  const submit = () => {
    if (!f.name.trim()) {
      setErr("نام مهارت الزامی است۔");
      return;
    }
    onSave({ ...f, name: f.name.trim() });
  };
  return (
    <div className="form-box no-print">
      <Field id="skill-name" label="نام مهارت" required error={err}>
        <input
          id="skill-name"
          className={"input" + (err ? " err" : "")}
          value={f.name}
          placeholder="مثلاً React"
          onChange={(e) => {
            setF({ ...f, name: e.target.value });
            setErr("");
          }}
        />
      </Field>
      <div className="grid-2">
        <Field id="skill-level" label="سطح مهارت">
          <select
            id="skill-level"
            className="input"
            value={f.level}
            onChange={(e) => setF({ ...f, level: e.target.value })}
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field id="skill-cat" label="دسته‌بندی">
          <select
            id="skill-cat"
            className="input"
            value={f.category}
            onChange={(e) => setF({ ...f, category: e.target.value })}
          >
            {SKILL_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}

function LanguageForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial ? { ...initial } : { name: "", level: "متوسط" },
  );
  const [err, setErr] = useState("");
  const submit = () => {
    if (!f.name.trim()) {
      setErr("نام زبان الزامی است۔");
      return;
    }
    onSave({ ...f, name: f.name.trim() });
  };
  return (
    <div className="form-box no-print">
      <Field id="lang-name" label="نام زبان" required error={err}>
        <input
          id="lang-name"
          className={"input" + (err ? " err" : "")}
          value={f.name}
          placeholder="مثلاً انگلیسی"
          onChange={(e) => {
            setF({ ...f, name: e.target.value });
            setErr("");
          }}
        />
      </Field>
      <Field id="lang-level" label="سطح تسلط">
        <select
          id="lang-level"
          className="input"
          value={f.level}
          onChange={(e) => setF({ ...f, level: e.target.value })}
        >
          {LANG_LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </Field>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}

function EducationForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? { ...initial }
      : {
          degree: "",
          field: "",
          university: "",
          startDate: "",
          endDate: "",
          ongoing: false,
          gpa: "",
          description: "",
          courses: [],
        },
  );
  const [errs, setErrs] = useState({});
  const submit = () => {
    const e = {};
    if (!f.degree.trim()) e.degree = "مقطع تحصیلی الزامی است۔";
    if (!f.field.trim()) e.field = "رشتهٔ تحصیلی الزامی است۔";
    if (!f.university.trim()) e.university = "نام دانشگاه یا مؤسسه الزامی است۔";
    if (!f.startDate.trim()) e.startDate = "تاریخ شروع الزامی است۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    onSave({ ...f });
  };
  return (
    <div className="form-box no-print">
      <div className="grid-2">
        <Field id="ed-degree" label="مقطع تحصیلی" required error={errs.degree}>
          <input
            id="ed-degree"
            className={"input" + (errs.degree ? " err" : "")}
            value={f.degree}
            placeholder="مثلاً کارشناسی"
            onChange={(e) => setF({ ...f, degree: e.target.value })}
          />
        </Field>
        <Field id="ed-field" label="رشتهٔ تحصیلی" required error={errs.field}>
          <input
            id="ed-field"
            className={"input" + (errs.field ? " err" : "")}
            value={f.field}
            placeholder="مثلاً مهندسی کامپیوتر"
            onChange={(e) => setF({ ...f, field: e.target.value })}
          />
        </Field>
      </div>
      <Field
        id="ed-uni"
        label="دانشگاه / مؤسسه"
        required
        error={errs.university}
      >
        <input
          id="ed-uni"
          className={"input" + (errs.university ? " err" : "")}
          value={f.university}
          placeholder="مثلاً دانشگاه تهران"
          onChange={(e) => setF({ ...f, university: e.target.value })}
        />
      </Field>
      <div className="grid-2">
        <Field id="ed-start" label="تاریخ شروع" required error={errs.startDate}>
          <input
            id="ed-start"
            className={"input" + (errs.startDate ? " err" : "")}
            value={f.startDate}
            placeholder="مثلاً مهر ۱۴۰۱"
            onChange={(e) => setF({ ...f, startDate: e.target.value })}
          />
        </Field>
        <Field id="ed-end" label="تاریخ پایان">
          <input
            id="ed-end"
            className="input"
            value={f.endDate}
            disabled={f.ongoing}
            placeholder="مثلاً خرداد ۱۴۰۵"
            onChange={(e) => setF({ ...f, endDate: e.target.value })}
          />
        </Field>
      </div>
      <label className="check-row">
        <input
          type="checkbox"
          checked={f.ongoing}
          onChange={(e) => setF({ ...f, ongoing: e.target.checked })}
        />
        در حال تحصیل
      </label>
      <Field id="ed-gpa" label="معدل">
        <input
          id="ed-gpa"
          className="input"
          value={f.gpa}
          placeholder="مثلاً ۱۸٫۲"
          onChange={(e) => setF({ ...f, gpa: e.target.value })}
        />
      </Field>
      <Field id="ed-desc" label="توضیحات">
        <textarea
          id="ed-desc"
          className="input"
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
        />
      </Field>
      <TagInput
        id="ed-courses"
        label="دروس مرتبط"
        value={f.courses}
        onChange={(v) => setF({ ...f, courses: v })}
        placeholder="نام درس را وارد کنید"
      />
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}

function ExperienceForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? { ...initial }
      : {
          jobTitle: "",
          company: "",
          type: "کارآموزی",
          startDate: "",
          endDate: "",
          ongoing: false,
          location: "",
          description: "",
          responsibilities: [],
          skillsUsed: [],
        },
  );
  const [errs, setErrs] = useState({});
  const submit = () => {
    const e = {};
    if (!f.jobTitle.trim()) e.jobTitle = "عنوان شغلی الزامی است۔";
    if (!f.company.trim()) e.company = "نام شرکت یا سازمان الزامی است۔";
    if (!f.startDate.trim()) e.startDate = "تاریخ شروع الزامی است۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    onSave({ ...f });
  };
  return (
    <div className="form-box no-print">
      <div className="grid-2">
        <Field id="ex-title" label="عنوان شغلی" required error={errs.jobTitle}>
          <input
            id="ex-title"
            className={"input" + (errs.jobTitle ? " err" : "")}
            value={f.jobTitle}
            placeholder="مثلاً کارآموز توسعهٔ فرانت‌اند"
            onChange={(e) => setF({ ...f, jobTitle: e.target.value })}
          />
        </Field>
        <Field
          id="ex-company"
          label="شرکت / سازمان"
          required
          error={errs.company}
        >
          <input
            id="ex-company"
            className={"input" + (errs.company ? " err" : "")}
            value={f.company}
            placeholder="مثلاً شرکت فناوری آریاتک"
            onChange={(e) => setF({ ...f, company: e.target.value })}
          />
        </Field>
      </div>
      <div className="grid-2">
        <Field id="ex-type" label="نوع همکاری">
          <select
            id="ex-type"
            className="input"
            value={f.type}
            onChange={(e) => setF({ ...f, type: e.target.value })}
          >
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field id="ex-loc" label="محل کار">
          <input
            id="ex-loc"
            className="input"
            value={f.location}
            placeholder="مثلاً تهران / دورکاری"
            onChange={(e) => setF({ ...f, location: e.target.value })}
          />
        </Field>
      </div>
      <div className="grid-2">
        <Field id="ex-start" label="تاریخ شروع" required error={errs.startDate}>
          <input
            id="ex-start"
            className={"input" + (errs.startDate ? " err" : "")}
            value={f.startDate}
            placeholder="مثلاً تیر ۱۴۰۳"
            onChange={(e) => setF({ ...f, startDate: e.target.value })}
          />
        </Field>
        <Field id="ex-end" label="تاریخ پایان">
          <input
            id="ex-end"
            className="input"
            value={f.endDate}
            disabled={f.ongoing}
            placeholder="مثلاً اسفند ۱۴۰۳"
            onChange={(e) => setF({ ...f, endDate: e.target.value })}
          />
        </Field>
      </div>
      <label className="check-row">
        <input
          type="checkbox"
          checked={f.ongoing}
          onChange={(e) => setF({ ...f, ongoing: e.target.checked })}
        />
        همچنان مشغول به همکاری
      </label>
      <Field id="ex-desc" label="توضیحات">
        <textarea
          id="ex-desc"
          className="input"
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
        />
      </Field>
      <TagInput
        id="ex-resp"
        label="مسئولیت‌ها"
        value={f.responsibilities}
        onChange={(v) => setF({ ...f, responsibilities: v })}
        placeholder="شرح مسئولیت را وارد کنید"
      />
      <TagInput
        id="ex-skills"
        label="مهارت‌های استفاده‌شده"
        value={f.skillsUsed}
        onChange={(v) => setF({ ...f, skillsUsed: v })}
        placeholder="نام مهارت را وارد کنید"
      />
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}

function ActivityForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? { ...initial }
      : {
          title: "",
          organization: "",
          role: "",
          date: "",
          description: "",
          achievements: "",
        },
  );
  const [errs, setErrs] = useState({});
  const submit = () => {
    const e = {};
    if (!f.title.trim()) e.title = "عنوان فعالیت الزامی است۔";
    if (!f.organization.trim())
      e.organization = "نام دانشگاه یا سازمان الزامی است۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    onSave({ ...f });
  };
  return (
    <div className="form-box no-print">
      <Field id="ac-title" label="عنوان فعالیت" required error={errs.title}>
        <input
          id="ac-title"
          className={"input" + (errs.title ? " err" : "")}
          value={f.title}
          placeholder="مثلاً عضویت در انجمن علمی"
          onChange={(e) => setF({ ...f, title: e.target.value })}
        />
      </Field>
      <div className="grid-2">
        <Field
          id="ac-org"
          label="دانشگاه / سازمان"
          required
          error={errs.organization}
        >
          <input
            id="ac-org"
            className={"input" + (errs.organization ? " err" : "")}
            value={f.organization}
            placeholder="مثلاً دانشگاه تهران"
            onChange={(e) => setF({ ...f, organization: e.target.value })}
          />
        </Field>
        <Field id="ac-role" label="نقش">
          <input
            id="ac-role"
            className="input"
            value={f.role}
            placeholder="مثلاً عضو کمیتهٔ فنی"
            onChange={(e) => setF({ ...f, role: e.target.value })}
          />
        </Field>
      </div>
      <Field id="ac-date" label="بازهٔ زمانی">
        <input
          id="ac-date"
          className="input"
          value={f.date}
          placeholder="مثلاً مهر ۱۴۰۲ تا اکنون"
          onChange={(e) => setF({ ...f, date: e.target.value })}
        />
      </Field>
      <Field id="ac-desc" label="توضیحات">
        <textarea
          id="ac-desc"
          className="input"
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
        />
      </Field>
      <Field id="ac-ach" label="دستاوردها">
        <textarea
          id="ac-ach"
          className="input"
          value={f.achievements}
          onChange={(e) => setF({ ...f, achievements: e.target.value })}
        />
      </Field>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}

function ProjectForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? { ...initial }
      : {
          title: "",
          description: "",
          technologies: [],
          category: PROJECT_CATEGORIES[0],
          startDate: "",
          endDate: "",
          github: "",
          demo: "",
          image: "",
          team: "فردی",
        },
  );
  const [errs, setErrs] = useState({});
  const submit = () => {
    const e = {};
    if (!f.title.trim()) e.title = "عنوان پروژه الزامی است۔";
    if (!f.description.trim()) e.description = "توضیح کوتاه پروژه الزامی است۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    onSave({ ...f });
  };
  return (
    <div className="form-box no-print">
      <Field id="pr-title" label="عنوان پروژه" required error={errs.title}>
        <input
          id="pr-title"
          className={"input" + (errs.title ? " err" : "")}
          value={f.title}
          placeholder="مثلاً وب‌اپ مدیریت پروژه"
          onChange={(e) => setF({ ...f, title: e.target.value })}
        />
      </Field>
      <Field id="pr-desc" label="توضیح کوتاه" required error={errs.description}>
        <textarea
          id="pr-desc"
          className={"input" + (errs.description ? " err" : "")}
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
        />
      </Field>
      <div className="grid-2">
        <Field id="pr-cat" label="دسته‌بندی">
          <select
            id="pr-cat"
            className="input"
            value={f.category}
            onChange={(e) => setF({ ...f, category: e.target.value })}
          >
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field id="pr-team" label="وضعیت انجام">
          <select
            id="pr-team"
            className="input"
            value={f.team}
            onChange={(e) => setF({ ...f, team: e.target.value })}
          >
            {TEAM_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid-2">
        <Field id="pr-start" label="تاریخ شروع">
          <input
            id="pr-start"
            className="input"
            value={f.startDate}
            placeholder="مثلاً فروردین ۱۴۰۳"
            onChange={(e) => setF({ ...f, startDate: e.target.value })}
          />
        </Field>
        <Field id="pr-end" label="تاریخ پایان">
          <input
            id="pr-end"
            className="input"
            value={f.endDate}
            placeholder="مثلاً دی ۱۴۰۳"
            onChange={(e) => setF({ ...f, endDate: e.target.value })}
          />
        </Field>
      </div>
      <div className="grid-2">
        <Field id="pr-github" label="پیوند گیت‌هاب">
          <input
            id="pr-github"
            dir="ltr"
            className="input"
            value={f.github}
            placeholder="https://github.com/..."
            onChange={(e) => setF({ ...f, github: e.target.value })}
          />
        </Field>
        <Field id="pr-demo" label="پیوند نمایش زنده">
          <input
            id="pr-demo"
            dir="ltr"
            className="input"
            value={f.demo}
            placeholder="https://..."
            onChange={(e) => setF({ ...f, demo: e.target.value })}
          />
        </Field>
      </div>
      <Field id="pr-img" label="آدرس تصویر پروژه (اختیاری)">
        <input
          id="pr-img"
          dir="ltr"
          className="input"
          value={f.image}
          placeholder="https://..."
          onChange={(e) => setF({ ...f, image: e.target.value })}
        />
      </Field>
      <TagInput
        id="pr-tech"
        label="فناوری‌های استفاده‌شده"
        value={f.technologies}
        onChange={(v) => setF({ ...f, technologies: v })}
        placeholder="مثلاً React"
      />
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}

function CertificateForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? { ...initial }
      : {
          name: "",
          issuer: "",
          date: "",
          credentialId: "",
          link: "",
          description: "",
        },
  );
  const [errs, setErrs] = useState({});
  const submit = () => {
    const e = {};
    if (!f.name.trim()) e.name = "نام دوره یا گواهینامه الزامی است۔";
    if (!f.issuer.trim()) e.issuer = "نام صادرکننده الزامی است۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    onSave({ ...f });
  };
  return (
    <div className="form-box no-print">
      <Field
        id="ce-name"
        label="نام دوره / گواهینامه"
        required
        error={errs.name}
      >
        <input
          id="ce-name"
          className={"input" + (errs.name ? " err" : "")}
          value={f.name}
          placeholder="مثلاً دورهٔ جامع React"
          onChange={(e) => setF({ ...f, name: e.target.value })}
        />
      </Field>
      <div className="grid-2">
        <Field id="ce-issuer" label="صادرکننده" required error={errs.issuer}>
          <input
            id="ce-issuer"
            className={"input" + (errs.issuer ? " err" : "")}
            value={f.issuer}
            placeholder="مثلاً آکادمی سبزلرن"
            onChange={(e) => setF({ ...f, issuer: e.target.value })}
          />
        </Field>
        <Field id="ce-date" label="تاریخ اخذ">
          <input
            id="ce-date"
            className="input"
            value={f.date}
            placeholder="مثلاً خرداد ۱۴۰۳"
            onChange={(e) => setF({ ...f, date: e.target.value })}
          />
        </Field>
      </div>
      <div className="grid-2">
        <Field id="ce-cred" label="شناسهٔ گواهینامه">
          <input
            id="ce-cred"
            className="input"
            value={f.credentialId}
            placeholder="مثلاً SBZ-1403-8821"
            onChange={(e) => setF({ ...f, credentialId: e.target.value })}
          />
        </Field>
        <Field id="ce-link" label="پیوند گواهینامه">
          <input
            id="ce-link"
            dir="ltr"
            className="input"
            value={f.link}
            placeholder="https://..."
            onChange={(e) => setF({ ...f, link: e.target.value })}
          />
        </Field>
      </div>
      <Field id="ce-desc" label="توضیح کوتاه">
        <textarea
          id="ce-desc"
          className="input"
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
        />
      </Field>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}

function AchievementForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? { ...initial }
      : { title: "", type: ACHIEVEMENT_TYPES[0], date: "", description: "" },
  );
  const [err, setErr] = useState("");
  const submit = () => {
    if (!f.title.trim()) {
      setErr("عنوان دستاورد الزامی است۔");
      return;
    }
    onSave({ ...f, title: f.title.trim() });
  };
  return (
    <div className="form-box no-print">
      <Field id="ah-title" label="عنوان دستاورد" required error={err}>
        <input
          id="ah-title"
          className={"input" + (err ? " err" : "")}
          value={f.title}
          placeholder="مثلاً رتبهٔ اول هکاتون"
          onChange={(e) => {
            setF({ ...f, title: e.target.value });
            setErr("");
          }}
        />
      </Field>
      <div className="grid-2">
        <Field id="ah-type" label="نوع دستاورد">
          <select
            id="ah-type"
            className="input"
            value={f.type}
            onChange={(e) => setF({ ...f, type: e.target.value })}
          >
            {ACHIEVEMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field id="ah-date" label="تاریخ">
          <input
            id="ah-date"
            className="input"
            value={f.date}
            placeholder="مثلاً آذر ۱۴۰۳"
            onChange={(e) => setF({ ...f, date: e.target.value })}
          />
        </Field>
      </div>
      <Field id="ah-desc" label="توضیحات">
        <textarea
          id="ah-desc"
          className="input"
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
        />
      </Field>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}

/* ------------------------------ Contact modal ---------------------------- */
function ContactModal({ open, onClose, showToast }) {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const firstRef = useRef(null);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setF({ name: "", email: "", subject: "", message: "" });
      setErrs({});
      setSent(false);
      const t = setTimeout(() => {
        if (firstRef.current) firstRef.current.focus();
      }, 60);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = () => {
    const e = {};
    if (!f.name.trim()) e.name = "نام الزامی است۔";
    if (!f.email.trim()) e.email = "ایمیل الزامی است۔";
    else if (!isValidEmail(f.email)) e.email = "ایمیل واردشده معتبر نیست۔";
    if (!f.subject.trim()) e.subject = "موضوع الزامی است۔";
    if (!f.message.trim()) e.message = "متن پیام الزامی است۔";
    else if (f.message.trim().length < 10)
      e.message = "متن پیام باید حداقل ۱۰ نویسه باشد۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    setSent(true);
    showToast("پیام شما با موفقیت ارسال شد۔");
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <span className="section-icon">
            <Icon name="send" size={18} />
          </span>
          <h2 id="contact-title">ارسال پیام</h2>
          <button
            type="button"
            className="icon-btn"
            aria-label="بستن پنجره"
            onClick={onClose}
          >
            <Icon name="x" size={16} />
          </button>
        </div>
        {sent ? (
          <div className="success-box">
            <span className="big">
              <Icon name="circleCheck" size={30} />
            </span>
            <h3 style={{ fontWeight: 800 }}>پیام شما ثبت شد</h3>
            <p style={{ color: "var(--muted)", fontSize: 13.5 }}>
              از تماس شما سپاسگزارم؛ در اولین فرصت پاسخ خواهم داد۔
            </p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              بستن
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            noValidate
          >
            <div className="grid-2">
              <Field id="ct-name" label="نام" required error={errs.name}>
                <input
                  ref={firstRef}
                  id="ct-name"
                  className={"input" + (errs.name ? " err" : "")}
                  value={f.name}
                  placeholder="نام شما"
                  onChange={(e) => setF({ ...f, name: e.target.value })}
                />
              </Field>
              <Field id="ct-email" label="ایمیل" required error={errs.email}>
                <input
                  id="ct-email"
                  dir="ltr"
                  type="email"
                  className={"input" + (errs.email ? " err" : "")}
                  value={f.email}
                  placeholder="you@example.com"
                  onChange={(e) => setF({ ...f, email: e.target.value })}
                />
              </Field>
            </div>
            <Field id="ct-subject" label="موضوع" required error={errs.subject}>
              <input
                id="ct-subject"
                className={"input" + (errs.subject ? " err" : "")}
                value={f.subject}
                placeholder="مثلاً پیشنهاد همکاری"
                onChange={(e) => setF({ ...f, subject: e.target.value })}
              />
            </Field>
            <Field id="ct-msg" label="متن پیام" required error={errs.message}>
              <textarea
                id="ct-msg"
                className={"input" + (errs.message ? " err" : "")}
                value={f.message}
                placeholder="پیام خود را بنویسید..."
                onChange={(e) => setF({ ...f, message: e.target.value })}
              />
            </Field>
            <div className="form-actions" style={{ marginTop: 10 }}>
              <button type="submit" className="btn btn-primary">
                <Icon name="send" size={16} />
                ارسال پیام
              </button>
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                انصراف
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- App ---------------------------------- */
export default function App() {
  const [profile, setProfile] = useState(loadProfile);
  const [editMode, setEditMode] = useState(false);
  const [editing, setEditing] = useState(null);
  const [personalErrors, setPersonalErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const backupRef = useRef(null);
  const toastTimer = useRef(null);
  const hydrated = useRef(false);

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

  useEffect(() => {
    if (hydrated.current) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch {
        /* storage unavailable */
      }
    } else {
      hydrated.current = true;
    }
  }, [profile]);

  const showToast = (msg, type = "ok") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

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
    showToast("با موفقیت ذخیره شد۔");
  };

  const removeItem = (section, id) => {
    if (!window.confirm("آیا از حذف این مورد مطمئن هستید؟")) return;
    setProfile((prev) => ({
      ...prev,
      [section]: (prev[section] || []).filter((it) => it.id !== id),
    }));
    setEditing(null);
    showToast("مورد موردنظر حذف شد۔");
  };

  const updateInterests = (list) =>
    setProfile((prev) => ({ ...prev, interests: Array.from(new Set(list)) }));

  const startEditProfile = () => {
    backupRef.current = clone(profile);
    setPersonalErrors({});
    setEditMode(true);
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
      showToast("لطفاً خطاهای فرم را برطرف کنید۔", "err");
      return;
    }
    setEditMode(false);
    setEditing(null);
    backupRef.current = null;
    showToast("تغییرات پروفایل با موفقیت ذخیره شد۔");
  };

  const cancelProfile = () => {
    if (backupRef.current) setProfile(backupRef.current);
    backupRef.current = null;
    setEditMode(false);
    setEditing(null);
    setPersonalErrors({});
  };

  const resetData = () => {
    if (!window.confirm("تمام داده‌ها به حالت پیش‌فرض بازنشانی شوند؟")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setProfile(clone(DEFAULT_PROFILE));
    setEditMode(false);
    setEditing(null);
    showToast("داده‌ها به حالت پیش‌فرض بازنشانی شد۔");
  };

  const shareProfile = async () => {
    const url = window.location.href;
    const shareTitle = "رزومهٔ دانشجویی " + profile.personal.fullName;
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareTitle, url });
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast("لینک پروفایل کپی شد۔");
    } catch {
      showToast("امکان اشتراک‌گذاری در دسترس نیست۔", "err");
    }
  };

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
  }, [profile]);

  const p = profile.personal;
  const isFormOpen = (section, id) =>
    !!editing && editing.section === section && editing.id === id;
  const startEdit = (section, id) => setEditing({ section, id });

  return (
    <div dir="rtl" className="app">
      <style>{CSS}</style>

      {/* ------------------------------ Header ------------------------------ */}
      <header className="card header-card">
        <div className="cover" aria-hidden="true" />
        <div className="header-body">
          <div className="avatar-wrap">
            <div className="avatar" aria-label={"تصویر پروفایل " + p.fullName}>
              <span aria-hidden="true">
                {(p.fullName || "؟").trim().charAt(0)}
              </span>
              <img
                src={IMG_AVATAR}
                alt={"تصویر پروفایل " + p.fullName}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>

          <div className="header-info">
            {editMode ? (
              <div className="no-print">
                <div className="grid-2">
                  <Field
                    id="hd-name"
                    label="نام و نام خانوادگی"
                    required
                    error={personalErrors.fullName}
                  >
                    <input
                      id="hd-name"
                      className={
                        "input" + (personalErrors.fullName ? " err" : "")
                      }
                      value={p.fullName}
                      onChange={(e) =>
                        updatePersonal("fullName", e.target.value)
                      }
                    />
                  </Field>
                  <Field
                    id="hd-title"
                    label="عنوان حرفه‌ای"
                    required
                    error={personalErrors.title}
                  >
                    <input
                      id="hd-title"
                      className={"input" + (personalErrors.title ? " err" : "")}
                      value={p.title}
                      onChange={(e) => updatePersonal("title", e.target.value)}
                    />
                  </Field>
                </div>
                <div className="grid-2">
                  <Field id="hd-uni" label="دانشگاه">
                    <input
                      id="hd-uni"
                      className="input"
                      value={p.university}
                      onChange={(e) =>
                        updatePersonal("university", e.target.value)
                      }
                    />
                  </Field>
                  <Field id="hd-field" label="رشتهٔ تحصیلی">
                    <input
                      id="hd-field"
                      className="input"
                      value={p.field}
                      onChange={(e) => updatePersonal("field", e.target.value)}
                    />
                  </Field>
                </div>
                <div className="grid-2">
                  <Field id="hd-sem" label="ترم تحصیلی">
                    <input
                      id="hd-sem"
                      className="input"
                      value={p.semester}
                      onChange={(e) =>
                        updatePersonal("semester", e.target.value)
                      }
                    />
                  </Field>
                  <Field id="hd-city" label="شهر محل سکونت">
                    <input
                      id="hd-city"
                      className="input"
                      value={p.city}
                      onChange={(e) => updatePersonal("city", e.target.value)}
                    />
                  </Field>
                </div>
                <Field id="hd-avail" label="وضعیت همکاری">
                  <select
                    id="hd-avail"
                    className="input"
                    value={p.availability}
                    onChange={(e) =>
                      updatePersonal("availability", e.target.value)
                    }
                  >
                    {AVAILABILITY_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            ) : (
              <>
                <h1>{p.fullName}</h1>
                <p className="header-title">{p.title}</p>
              </>
            )}

            <div className="meta-chips">
              {p.university ? (
                <span className="chip">
                  <Icon name="gradCap" size={14} />
                  {p.university}
                </span>
              ) : null}
              {p.field ? (
                <span className="chip">
                  <Icon name="book" size={14} />
                  {p.field}
                </span>
              ) : null}
              {p.semester ? (
                <span className="chip">
                  <Icon name="star" size={14} />
                  {p.semester}
                </span>
              ) : null}
              {p.city ? (
                <span className="chip">
                  <Icon name="mapPin" size={14} />
                  {p.city}
                </span>
              ) : null}
              {p.availability ? (
                <span className="badge-avail">
                  <span className="dot" aria-hidden="true" />
                  {p.availability}
                </span>
              ) : null}
            </div>

            {!editMode && p.about.trim() ? (
              <p className="header-intro">{firstSentence(p.about)}</p>
            ) : null}
          </div>

          <div className="header-actions no-print">
            {editMode ? (
              <>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveProfile}
                >
                  <Icon name="check" size={16} />
                  ذخیره تغییرات
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={cancelProfile}
                >
                  <Icon name="x" size={16} />
                  انصراف
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={startEditProfile}
                >
                  <Icon name="pencil" size={16} />
                  ویرایش پروفایل
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => window.print()}
                >
                  <Icon name="download" size={16} />
                  دانلود رزومه
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={shareProfile}
                  aria-label="اشتراک‌گذاری پروفایل"
                >
                  <Icon name="share" size={16} />
                  اشتراک‌گذاری
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ------------------------------ Layout ------------------------------ */}
      <div className="layout">
        {/* ------------------------------ Sidebar ---------------------------- */}
        <aside className="col" aria-label="اطلاعات جانبی">
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
                : "پروفایل شما " +
                  faNum(completion.percent) +
                  "٪ تکمیل شده است۔"}
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

          <SectionCard
            icon="user"
            title="اطلاعات شخصی"
            titleId="personal-title"
          >
            {editMode ? (
              <div className="no-print">
                <div className="grid-2">
                  <Field id="pi-birth" label="تاریخ تولد">
                    <input
                      id="pi-birth"
                      className="input"
                      value={p.birthDate}
                      placeholder="مثلاً ۱۳۸۲/۰۵/۱۴"
                      onChange={(e) =>
                        updatePersonal("birthDate", e.target.value)
                      }
                    />
                  </Field>
                  <Field id="pi-stud" label="شمارهٔ دانشجویی">
                    <input
                      id="pi-stud"
                      className="input"
                      value={p.studentId}
                      onChange={(e) =>
                        updatePersonal("studentId", e.target.value)
                      }
                    />
                  </Field>
                </div>
                <Field
                  id="pi-email"
                  label="ایمیل"
                  required
                  error={personalErrors.email}
                >
                  <input
                    id="pi-email"
                    dir="ltr"
                    type="email"
                    className={"input" + (personalErrors.email ? " err" : "")}
                    value={p.email}
                    onChange={(e) => updatePersonal("email", e.target.value)}
                  />
                </Field>
                <Field id="pi-phone" label="شمارهٔ تماس">
                  <input
                    id="pi-phone"
                    className="input"
                    value={p.phone}
                    placeholder="مثلاً ۰۹۱۲ ۳۴۵ ۶۷۸۹"
                    onChange={(e) => updatePersonal("phone", e.target.value)}
                  />
                </Field>
                <Field id="pi-linkedin" label="لینکدین">
                  <input
                    id="pi-linkedin"
                    dir="ltr"
                    className="input"
                    value={p.linkedin}
                    onChange={(e) => updatePersonal("linkedin", e.target.value)}
                  />
                </Field>
                <Field id="pi-github" label="گیت‌هاب">
                  <input
                    id="pi-github"
                    dir="ltr"
                    className="input"
                    value={p.github}
                    onChange={(e) => updatePersonal("github", e.target.value)}
                  />
                </Field>
                <Field id="pi-web" label="وب‌سایت شخصی">
                  <input
                    id="pi-web"
                    dir="ltr"
                    className="input"
                    value={p.website}
                    placeholder="https://..."
                    onChange={(e) => updatePersonal("website", e.target.value)}
                  />
                </Field>
              </div>
            ) : (
              <>
                {p.birthDate ? (
                  <div className="info-row">
                    <span className="ic">
                      <Icon name="calendar" size={15} />
                    </span>
                    <div>
                      <span className="lbl">تاریخ تولد</span>
                      <span className="val">{p.birthDate}</span>
                    </div>
                  </div>
                ) : null}
                {p.studentId ? (
                  <div className="info-row">
                    <span className="ic">
                      <Icon name="hash" size={15} />
                    </span>
                    <div>
                      <span className="lbl">شمارهٔ دانشجویی</span>
                      <span className="val">{p.studentId}</span>
                    </div>
                  </div>
                ) : null}
                <div className="info-row">
                  <span className="ic">
                    <Icon name="mapPin" size={15} />
                  </span>
                  <div>
                    <span className="lbl">شهر محل سکونت</span>
                    <span className="val">{p.city}</span>
                  </div>
                </div>
                {p.linkedin ? (
                  <div className="info-row">
                    <span className="ic">
                      <Icon name="linkedin" size={15} />
                    </span>
                    <div>
                      <span className="lbl">لینکدین</span>
                      <span className="val ltr">{p.linkedin}</span>
                    </div>
                  </div>
                ) : null}
                {p.github ? (
                  <div className="info-row">
                    <span className="ic">
                      <Icon name="github" size={15} />
                    </span>
                    <div>
                      <span className="lbl">گیت‌هاب</span>
                      <span className="val ltr">{p.github}</span>
                    </div>
                  </div>
                ) : null}
                {p.website ? (
                  <div className="info-row">
                    <span className="ic">
                      <Icon name="globe" size={15} />
                    </span>
                    <div>
                      <span className="lbl">وب‌سایت شخصی</span>
                      <span className="val ltr">{p.website}</span>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </SectionCard>

          <SectionCard
            icon="languages"
            title="زبان‌ها"
            titleId="languages-title"
          >
            {profile.languages.length === 0 &&
            !isFormOpen("languages", "new") ? (
              <EmptyState
                text="هنوز زبانی اضافه نشده است۔"
                onAdd={editMode ? () => startEdit("languages", "new") : null}
                addLabel="افزودن زبان"
              />
            ) : (
              <div className="stack" style={{ gap: 8 }}>
                {profile.languages.map((lg) =>
                  isFormOpen("languages", lg.id) ? (
                    <LanguageForm
                      key={lg.id}
                      initial={lg}
                      onSave={(d) => saveItem("languages", lg.id, d)}
                      onCancel={() => setEditing(null)}
                    />
                  ) : (
                    <EditableItem
                      key={lg.id}
                      editMode={editMode}
                      onEdit={() => startEdit("languages", lg.id)}
                      onDelete={() => removeItem("languages", lg.id)}
                    >
                      <div className="skill-row" style={{ padding: "2px 0" }}>
                        <div className="skill-top">
                          <span>{lg.name}</span>
                          <span className="skill-level">{lg.level}</span>
                        </div>
                      </div>
                    </EditableItem>
                  ),
                )}
                {isFormOpen("languages", "new") ? (
                  <LanguageForm
                    onSave={(d) => saveItem("languages", "new", d)}
                    onCancel={() => setEditing(null)}
                  />
                ) : null}
                {editMode && !isFormOpen("languages", "new") ? (
                  <AddButton
                    onClick={() => startEdit("languages", "new")}
                    label="افزودن زبان"
                  />
                ) : null}
              </div>
            )}
          </SectionCard>

          <SectionCard icon="sparkles" title="مهارت‌ها" titleId="skills-title">
            {profile.skills.length === 0 && !isFormOpen("skills", "new") ? (
              <EmptyState
                text="هنوز مهارتی اضافه نشده است۔"
                onAdd={editMode ? () => startEdit("skills", "new") : null}
                addLabel="افزودن مهارت"
              />
            ) : (
              <>
                {SKILL_CATEGORIES.map((cat) => {
                  const items = profile.skills.filter(
                    (s) => s.category === cat,
                  );
                  if (!items.length) return null;
                  return (
                    <div key={cat}>
                      <h3 className="sub-title">{cat}</h3>
                      <div className="stack" style={{ gap: 4 }}>
                        {items.map((s) =>
                          isFormOpen("skills", s.id) ? (
                            <SkillForm
                              key={s.id}
                              initial={s}
                              onSave={(d) => saveItem("skills", s.id, d)}
                              onCancel={() => setEditing(null)}
                            />
                          ) : (
                            <EditableItem
                              key={s.id}
                              editMode={editMode}
                              onEdit={() => startEdit("skills", s.id)}
                              onDelete={() => removeItem("skills", s.id)}
                            >
                              <div className="skill-row">
                                <div className="skill-top">
                                  <span>{s.name}</span>
                                  <span className="skill-level">{s.level}</span>
                                </div>
                                <div
                                  className="progress"
                                  role="img"
                                  aria-label={"سطح " + s.name + ": " + s.level}
                                >
                                  <span
                                    style={{
                                      width: LEVEL_PCT[s.level] || "50%",
                                    }}
                                  />
                                </div>
                              </div>
                            </EditableItem>
                          ),
                        )}
                      </div>
                    </div>
                  );
                })}
                {isFormOpen("skills", "new") ? (
                  <SkillForm
                    onSave={(d) => saveItem("skills", "new", d)}
                    onCancel={() => setEditing(null)}
                  />
                ) : null}
                {editMode && !isFormOpen("skills", "new") ? (
                  <AddButton
                    onClick={() => startEdit("skills", "new")}
                    label="افزودن مهارت"
                  />
                ) : null}
              </>
            )}
          </SectionCard>

          <SectionCard icon="heart" title="علایق" titleId="interests-title">
            {profile.interests.length === 0 && !editMode ? (
              <EmptyState text="هنوز علایقی ثبت نشده است۔" />
            ) : (
              <>
                <div className="tags">
                  {profile.interests.map((it, i) => (
                    <span className="tag" key={it + "-" + i}>
                      {it}
                      {editMode ? (
                        <button
                          type="button"
                          className="no-print"
                          aria-label={"حذف " + it}
                          onClick={() =>
                            updateInterests(
                              profile.interests.filter((v) => v !== it),
                            )
                          }
                        >
                          <Icon name="x" size={13} />
                        </button>
                      ) : null}
                    </span>
                  ))}
                </div>
                {editMode ? (
                  <div className="no-print" style={{ marginTop: 12 }}>
                    <TagInput
                      id="interest-input"
                      label="افزودن علاقهٔ جدید"
                      value={[]}
                      onChange={(v) =>
                        updateInterests([...profile.interests, ...v])
                      }
                      placeholder="مثلاً عکاسی"
                    />
                  </div>
                ) : null}
              </>
            )}
          </SectionCard>

          <SectionCard
            icon="mail"
            title="اطلاعات تماس"
            titleId="contact-side-title"
          >
            <div className="info-row">
              <span className="ic">
                <Icon name="mail" size={15} />
              </span>
              <div>
                <span className="lbl">ایمیل</span>
                <span className="val ltr">{p.email}</span>
              </div>
            </div>
            {p.phone ? (
              <div className="info-row">
                <span className="ic">
                  <Icon name="phone" size={15} />
                </span>
                <div>
                  <span className="lbl">شمارهٔ تماس</span>
                  <span className="val">{p.phone}</span>
                </div>
              </div>
            ) : null}
            {p.linkedin ? (
              <div className="info-row">
                <span className="ic">
                  <Icon name="linkedin" size={15} />
                </span>
                <div>
                  <span className="lbl">لینکدین</span>
                  <span className="val ltr">{p.linkedin}</span>
                </div>
              </div>
            ) : null}
            {p.github ? (
              <div className="info-row">
                <span className="ic">
                  <Icon name="github" size={15} />
                </span>
                <div>
                  <span className="lbl">گیت‌هاب</span>
                  <span className="val ltr">{p.github}</span>
                </div>
              </div>
            ) : null}
            {p.website ? (
              <div className="info-row">
                <span className="ic">
                  <Icon name="globe" size={15} />
                </span>
                <div>
                  <span className="lbl">وب‌سایت</span>
                  <span className="val ltr">{p.website}</span>
                </div>
              </div>
            ) : null}
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: 14 }}
              onClick={() => setContactOpen(true)}
            >
              <Icon name="send" size={16} />
              ارسال پیام
            </button>
          </SectionCard>
        </aside>

        {/* ------------------------------- Main ------------------------------ */}
        <main className="col" aria-label="محتوای اصلی رزومه">
          <SectionCard icon="user" title="درباره من" titleId="about-title">
            {editMode ? (
              <div className="no-print">
                <Field id="about-input" label="متن معرفی" required>
                  <textarea
                    id="about-input"
                    className="input"
                    style={{ minHeight: 130 }}
                    value={p.about}
                    onChange={(e) => updatePersonal("about", e.target.value)}
                  />
                </Field>
              </div>
            ) : (
              <p style={{ color: "var(--muted)", fontSize: 14 }}>{p.about}</p>
            )}
          </SectionCard>

          <SectionCard
            icon="gradCap"
            title="سوابق تحصیلی"
            titleId="education-title"
          >
            {profile.education.length === 0 &&
            !isFormOpen("education", "new") ? (
              <EmptyState
                text="هنوز سابقهٔ تحصیلی اضافه نشده است۔"
                onAdd={editMode ? () => startEdit("education", "new") : null}
                addLabel="افزودن سابقهٔ تحصیلی"
              />
            ) : (
              <>
                <div className="timeline">
                  {profile.education.map((ed) =>
                    isFormOpen("education", ed.id) ? (
                      <div className="tl-item" key={ed.id}>
                        <EducationForm
                          initial={ed}
                          onSave={(d) => saveItem("education", ed.id, d)}
                          onCancel={() => setEditing(null)}
                        />
                      </div>
                    ) : (
                      <div className="tl-item" key={ed.id}>
                        <EditableItem
                          editMode={editMode}
                          onEdit={() => startEdit("education", ed.id)}
                          onDelete={() => removeItem("education", ed.id)}
                        >
                          <h3>
                            {ed.degree} {ed.field}
                          </h3>
                          <p className="tl-sub">{ed.university}</p>
                          <div className="meta">
                            <span>
                              <Icon name="calendar" size={13} />
                              {dateRange(ed.startDate, ed.endDate, ed.ongoing)}
                            </span>
                            {ed.gpa ? (
                              <span>
                                <Icon name="star" size={13} />
                                معدل: {ed.gpa}
                              </span>
                            ) : null}
                          </div>
                          {ed.description ? (
                            <p className="tl-desc">{ed.description}</p>
                          ) : null}
                          {ed.courses && ed.courses.length > 0 ? (
                            <div className="tags" style={{ marginTop: 10 }}>
                              {ed.courses.map((c, i) => (
                                <span className="tag" key={c + "-" + i}>
                                  {c}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </EditableItem>
                      </div>
                    ),
                  )}
                </div>
                {isFormOpen("education", "new") ? (
                  <EducationForm
                    onSave={(d) => saveItem("education", "new", d)}
                    onCancel={() => setEditing(null)}
                  />
                ) : null}
                {editMode && !isFormOpen("education", "new") ? (
                  <AddButton
                    onClick={() => startEdit("education", "new")}
                    label="افزودن سابقهٔ تحصیلی"
                  />
                ) : null}
              </>
            )}
          </SectionCard>

          <SectionCard
            icon="briefcase"
            title="سوابق کاری"
            titleId="experience-title"
          >
            {profile.experiences.length === 0 &&
            !isFormOpen("experiences", "new") ? (
              <EmptyState
                text="هنوز تجربه‌ای به این بخش اضافه نشده است۔"
                onAdd={editMode ? () => startEdit("experiences", "new") : null}
                addLabel="افزودن سابقهٔ کاری"
              />
            ) : (
              <>
                <div className="timeline">
                  {profile.experiences.map((ex) =>
                    isFormOpen("experiences", ex.id) ? (
                      <div className="tl-item" key={ex.id}>
                        <ExperienceForm
                          initial={ex}
                          onSave={(d) => saveItem("experiences", ex.id, d)}
                          onCancel={() => setEditing(null)}
                        />
                      </div>
                    ) : (
                      <div className="tl-item" key={ex.id}>
                        <EditableItem
                          editMode={editMode}
                          onEdit={() => startEdit("experiences", ex.id)}
                          onDelete={() => removeItem("experiences", ex.id)}
                        >
                          <h3>{ex.jobTitle}</h3>
                          <p className="tl-sub">{ex.company}</p>
                          <div className="meta">
                            <span>
                              <Icon name="briefcase" size={13} />
                              {ex.type}
                            </span>
                            <span>
                              <Icon name="calendar" size={13} />
                              {dateRange(ex.startDate, ex.endDate, ex.ongoing)}
                            </span>
                            {ex.location ? (
                              <span>
                                <Icon name="mapPin" size={13} />
                                {ex.location}
                              </span>
                            ) : null}
                          </div>
                          {ex.description ? (
                            <p className="tl-desc">{ex.description}</p>
                          ) : null}
                          {ex.responsibilities &&
                          ex.responsibilities.length > 0 ? (
                            <ul className="bullet">
                              {ex.responsibilities.map((r, i) => (
                                <li key={r + "-" + i}>{r}</li>
                              ))}
                            </ul>
                          ) : null}
                          {ex.skillsUsed && ex.skillsUsed.length > 0 ? (
                            <div className="tags" style={{ marginTop: 10 }}>
                              {ex.skillsUsed.map((s, i) => (
                                <span className="tag" key={s + "-" + i}>
                                  {s}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </EditableItem>
                      </div>
                    ),
                  )}
                </div>
                {isFormOpen("experiences", "new") ? (
                  <ExperienceForm
                    onSave={(d) => saveItem("experiences", "new", d)}
                    onCancel={() => setEditing(null)}
                  />
                ) : null}
                {editMode && !isFormOpen("experiences", "new") ? (
                  <AddButton
                    onClick={() => startEdit("experiences", "new")}
                    label="افزودن سابقهٔ کاری"
                  />
                ) : null}
              </>
            )}
          </SectionCard>

          <SectionCard
            icon="users"
            title="فعالیت‌ها و تجربه‌های دانشگاهی"
            titleId="activities-title"
          >
            {profile.activities.length === 0 &&
            !isFormOpen("activities", "new") ? (
              <EmptyState
                text="هنوز فعالیتی به این بخش اضافه نشده است۔"
                onAdd={editMode ? () => startEdit("activities", "new") : null}
                addLabel="افزودن فعالیت"
              />
            ) : (
              <>
                <div className="stack">
                  {profile.activities.map((ac) =>
                    isFormOpen("activities", ac.id) ? (
                      <ActivityForm
                        key={ac.id}
                        initial={ac}
                        onSave={(d) => saveItem("activities", ac.id, d)}
                        onCancel={() => setEditing(null)}
                      />
                    ) : (
                      <EditableItem
                        key={ac.id}
                        editMode={editMode}
                        onEdit={() => startEdit("activities", ac.id)}
                        onDelete={() => removeItem("activities", ac.id)}
                      >
                        <h3 style={{ fontSize: 14.5, fontWeight: 800 }}>
                          {ac.title}
                        </h3>
                        <p className="tl-sub">
                          {ac.role ? ac.role + " — " : ""}
                          {ac.organization}
                        </p>
                        {ac.date ? (
                          <div className="meta">
                            <span>
                              <Icon name="clock" size={13} />
                              {ac.date}
                            </span>
                          </div>
                        ) : null}
                        {ac.description ? (
                          <p className="tl-desc">{ac.description}</p>
                        ) : null}
                        {ac.achievements ? (
                          <p
                            className="tl-desc"
                            style={{
                              color: "var(--green)",
                              display: "flex",
                              gap: 6,
                              alignItems: "center",
                            }}
                          >
                            <Icon name="award" size={13} />
                            {ac.achievements}
                          </p>
                        ) : null}
                      </EditableItem>
                    ),
                  )}
                </div>
                {isFormOpen("activities", "new") ? (
                  <ActivityForm
                    onSave={(d) => saveItem("activities", "new", d)}
                    onCancel={() => setEditing(null)}
                  />
                ) : null}
                {editMode && !isFormOpen("activities", "new") ? (
                  <AddButton
                    onClick={() => startEdit("activities", "new")}
                    label="افزودن فعالیت"
                  />
                ) : null}
              </>
            )}
          </SectionCard>

          <SectionCard icon="rocket" title="پروژه‌ها" titleId="projects-title">
            {profile.projects.length === 0 && !isFormOpen("projects", "new") ? (
              <EmptyState
                text="هنوز پروژه‌ای ثبت نشده است۔"
                onAdd={editMode ? () => startEdit("projects", "new") : null}
                addLabel="افزودن پروژه"
              />
            ) : (
              <>
                <div className="project-grid">
                  {profile.projects.map((pr) =>
                    isFormOpen("projects", pr.id) ? (
                      <div key={pr.id} style={{ gridColumn: "1 / -1" }}>
                        <ProjectForm
                          initial={pr}
                          onSave={(d) => saveItem("projects", pr.id, d)}
                          onCancel={() => setEditing(null)}
                        />
                      </div>
                    ) : (
                      <article className="project-card" key={pr.id}>
                        {editMode ? (
                          <div
                            className="item-tools no-print"
                            style={{ top: 8, insetInlineEnd: 8 }}
                          >
                            <button
                              type="button"
                              className="icon-btn"
                              style={{ background: "#fff" }}
                              aria-label="ویرایش پروژه"
                              onClick={() => startEdit("projects", pr.id)}
                            >
                              <Icon name="pencil" size={15} />
                            </button>
                            <button
                              type="button"
                              className="icon-btn danger"
                              style={{ background: "#fff" }}
                              aria-label="حذف پروژه"
                              onClick={() => removeItem("projects", pr.id)}
                            >
                              <Icon name="trash" size={15} />
                            </button>
                          </div>
                        ) : null}
                        <div className="project-img">
                          <span className="ph-icon">
                            <Icon name="folder" size={34} />
                          </span>
                          {pr.image ? (
                            <img
                              src={pr.image}
                              alt={"تصویر پروژهٔ " + pr.title}
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : null}
                        </div>
                        <div className="project-body">
                          <div className="proj-top">
                            <h3>{pr.title}</h3>
                            <span className="tag tag-cat">{pr.category}</span>
                          </div>
                          <p className="project-desc">{pr.description}</p>
                          {pr.technologies && pr.technologies.length > 0 ? (
                            <div className="tags">
                              {pr.technologies.map((t, i) => (
                                <span className="tag" key={t + "-" + i}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          ) : null}
                          <div className="meta">
                            {pr.startDate ? (
                              <span>
                                <Icon name="calendar" size={13} />
                                {dateRange(pr.startDate, pr.endDate, false)}
                              </span>
                            ) : null}
                            <span>
                              <Icon name="users" size={13} />
                              {pr.team}
                            </span>
                          </div>
                          <div className="proj-links">
                            {pr.demo ? (
                              <a
                                className="btn btn-primary btn-sm"
                                href={pr.demo}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Icon name="external" size={14} />
                                مشاهده پروژه
                              </a>
                            ) : null}
                            {pr.github ? (
                              <a
                                className="btn btn-outline btn-sm"
                                href={pr.github}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Icon name="github" size={14} />
                                مشاهده کد
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    ),
                  )}
                </div>
                {isFormOpen("projects", "new") ? (
                  <ProjectForm
                    onSave={(d) => saveItem("projects", "new", d)}
                    onCancel={() => setEditing(null)}
                  />
                ) : null}
                {editMode && !isFormOpen("projects", "new") ? (
                  <AddButton
                    onClick={() => startEdit("projects", "new")}
                    label="افزودن پروژه"
                  />
                ) : null}
              </>
            )}
          </SectionCard>

          <SectionCard
            icon="book"
            title="دوره‌ها و گواهینامه‌ها"
            titleId="certificates-title"
          >
            {profile.certificates.length === 0 &&
            !isFormOpen("certificates", "new") ? (
              <EmptyState
                text="هنوز گواهینامه‌ای ثبت نشده است۔"
                onAdd={editMode ? () => startEdit("certificates", "new") : null}
                addLabel="افزودن گواهینامه"
              />
            ) : (
              <>
                <div className="stack">
                  {profile.certificates.map((ce) =>
                    isFormOpen("certificates", ce.id) ? (
                      <CertificateForm
                        key={ce.id}
                        initial={ce}
                        onSave={(d) => saveItem("certificates", ce.id, d)}
                        onCancel={() => setEditing(null)}
                      />
                    ) : (
                      <EditableItem
                        key={ce.id}
                        editMode={editMode}
                        onEdit={() => startEdit("certificates", ce.id)}
                        onDelete={() => removeItem("certificates", ce.id)}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "flex-start",
                          }}
                        >
                          <span
                            className="section-icon"
                            style={{ width: 34, height: 34 }}
                          >
                            <Icon name="award" size={16} />
                          </span>
                          <div style={{ minWidth: 0 }}>
                            <h3 style={{ fontSize: 14.5, fontWeight: 800 }}>
                              {ce.name}
                            </h3>
                            <div className="meta">
                              <span>
                                <Icon name="briefcase" size={13} />
                                {ce.issuer}
                              </span>
                              {ce.date ? (
                                <span>
                                  <Icon name="calendar" size={13} />
                                  {ce.date}
                                </span>
                              ) : null}
                              {ce.credentialId ? (
                                <span>
                                  <Icon name="hash" size={13} />
                                  <span className="ltr">{ce.credentialId}</span>
                                </span>
                              ) : null}
                            </div>
                            {ce.description ? (
                              <p className="tl-desc">{ce.description}</p>
                            ) : null}
                            {ce.link ? (
                              <a
                                style={{
                                  color: "var(--accent)",
                                  fontSize: 13,
                                  fontWeight: 700,
                                  display: "inline-flex",
                                  gap: 5,
                                  alignItems: "center",
                                  marginTop: 6,
                                }}
                                href={ce.link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Icon name="link" size={13} />
                                مشاهدهٔ گواهینامه
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </EditableItem>
                    ),
                  )}
                </div>
                {isFormOpen("certificates", "new") ? (
                  <CertificateForm
                    onSave={(d) => saveItem("certificates", "new", d)}
                    onCancel={() => setEditing(null)}
                  />
                ) : null}
                {editMode && !isFormOpen("certificates", "new") ? (
                  <AddButton
                    onClick={() => startEdit("certificates", "new")}
                    label="افزودن گواهینامه"
                  />
                ) : null}
              </>
            )}
          </SectionCard>

          <SectionCard
            icon="medal"
            title="افتخارات و دستاوردها"
            titleId="achievements-title"
          >
            {profile.achievements.length === 0 &&
            !isFormOpen("achievements", "new") ? (
              <EmptyState
                text="هنوز دستاوردی ثبت نشده است۔"
                onAdd={editMode ? () => startEdit("achievements", "new") : null}
                addLabel="افزودن دستاورد"
              />
            ) : (
              <>
                <div className="stack">
                  {profile.achievements.map((ah) =>
                    isFormOpen("achievements", ah.id) ? (
                      <AchievementForm
                        key={ah.id}
                        initial={ah}
                        onSave={(d) => saveItem("achievements", ah.id, d)}
                        onCancel={() => setEditing(null)}
                      />
                    ) : (
                      <EditableItem
                        key={ah.id}
                        editMode={editMode}
                        onEdit={() => startEdit("achievements", ah.id)}
                        onDelete={() => removeItem("achievements", ah.id)}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "flex-start",
                          }}
                        >
                          <span
                            className="section-icon"
                            style={{
                              width: 34,
                              height: 34,
                              background: "var(--green-soft)",
                              color: "var(--green)",
                            }}
                          >
                            <Icon name="medal" size={16} />
                          </span>
                          <div style={{ minWidth: 0 }}>
                            <h3 style={{ fontSize: 14.5, fontWeight: 800 }}>
                              {ah.title}
                            </h3>
                            <div className="meta">
                              <span
                                className="tag tag-cat"
                                style={{ padding: "1px 10px" }}
                              >
                                {ah.type}
                              </span>
                              {ah.date ? (
                                <span>
                                  <Icon name="calendar" size={13} />
                                  {ah.date}
                                </span>
                              ) : null}
                            </div>
                            {ah.description ? (
                              <p className="tl-desc">{ah.description}</p>
                            ) : null}
                          </div>
                        </div>
                      </EditableItem>
                    ),
                  )}
                </div>
                {isFormOpen("achievements", "new") ? (
                  <AchievementForm
                    onSave={(d) => saveItem("achievements", "new", d)}
                    onCancel={() => setEditing(null)}
                  />
                ) : null}
                {editMode && !isFormOpen("achievements", "new") ? (
                  <AddButton
                    onClick={() => startEdit("achievements", "new")}
                    label="افزودن دستاورد"
                  />
                ) : null}
              </>
            )}
          </SectionCard>
        </main>
      </div>

      {/* ------------------------------ Footer ------------------------------ */}
      <footer className="footer">
        <p>© ۱۴۰۴ — {p.fullName} | تمام حقوق محفوظ است۔</p>
        <button
          type="button"
          className="btn btn-ghost btn-sm no-print"
          onClick={resetData}
        >
          <Icon name="rotate" size={14} />
          بازنشانی به داده‌های پیش‌فرض
        </button>
      </footer>

      {/* --------------------------- Edit mode bar -------------------------- */}
      {editMode ? (
        <div
          className="edit-bar no-print"
          role="region"
          aria-label="نوار ویرایش"
        >
          <span className="hint">
            <Icon name="pencil" size={14} />
            حالت ویرایش فعال است
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={saveProfile}
            >
              <Icon name="check" size={14} />
              ذخیره تغییرات
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={cancelProfile}
            >
              انصراف
            </button>
          </div>
        </div>
      ) : null}

      {/* ------------------------------- Toast ------------------------------ */}
      {toast ? (
        <div className={"toast " + toast.type} role="status" aria-live="polite">
          <Icon
            name={toast.type === "ok" ? "circleCheck" : "alert"}
            size={16}
          />
          {toast.msg}
        </div>
      ) : null}

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        showToast={showToast}
      />
    </div>
  );
}
