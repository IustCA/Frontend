export const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export function toPersianDigits(str) {
  return String(str).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

export function toEnglishDigits(str) {
  return String(str).replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
}

export function parseValue(value) {
  const v = toEnglishDigits(String(value || "").trim());
  if (!v) return { year: "", month: "", day: "" };
  const parts = v.split(/[/-]/);
  if (parts.length >= 2) {
    return {
      year: parts[0] || "",
      month: parts[1] ? String(Number(parts[1])).padStart(2, "0") : "",
      day: parts[2] ? String(Number(parts[2])).padStart(2, "0") : "",
    };
  }
  for (let i = 0; i < PERSIAN_MONTHS.length; i++) {
    if (v.includes(PERSIAN_MONTHS[i])) {
      const yearMatch = v.match(/(1[3-4]\d{2})/);
      return {
        year: yearMatch ? yearMatch[1] : "",
        month: String(i + 1).padStart(2, "0"),
        day: "",
      };
    }
  }
  return { year: "", month: "", day: "" };
}

export function getTodayJalali() {
  try {
    const d = new Date();
    const fmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const parts = fmt.formatToParts(d);
    const toEn = (s) => s.replace(/[۰-۹]/g, (ch) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(ch)]);
    const jy = Number(toEn(parts.find((p) => p.type === "year")?.value || "0"));
    const jm = Number(toEn(parts.find((p) => p.type === "month")?.value || "0"));
    const jd = Number(toEn(parts.find((p) => p.type === "day")?.value || "0"));
    if (jy && jm && jd) return { jy, jm, jd };
  } catch (e) {
    void e;
  }
  return { jy: 1405, jm: 1, jd: 1 };
}

function isAfterToday(y, m, d, today, mode) {
  const yi = Number(y), mi = Number(m), di = Number(d || 1);
  if (!yi || !mi) return false;
  if (mode === "monthYear") {
    if (yi > today.jy) return true;
    if (yi === today.jy && mi > today.jm) return true;
    return false;
  }
  if (yi > today.jy) return true;
  if (yi < today.jy) return false;
  if (mi > today.jm) return true;
  if (mi < today.jm) return false;
  if (di > today.jd) return true;
  return false;
}

function isBeforeMin(y, m, d, min, mode) {
  if (!min?.year || !min?.month) return false;
  const yi = Number(y), mi = Number(m), di = Number(d || 1);
  const minY = Number(min.year), minM = Number(min.month), minD = Number(min.day || 1);
  if (mode === "monthYear") {
    if (yi < minY) return true;
    if (yi === minY && mi < minM) return true;
    return false;
  }
  if (yi < minY) return true;
  if (yi > minY) return false;
  if (mi < minM) return true;
  if (mi > minM) return false;
  if (di < minD) return true;
  return false;
}

export function isAfterTodayStr(dateStr, mode = "monthYear") {
  if (!dateStr) return false;
  const p = parseValue(dateStr);
  if (!p.year || !p.month) return false;
  return isAfterToday(p.year, p.month, p.day, getTodayJalali(), mode);
}

export function isBeforeStr(dateStr, minStr, mode = "monthYear") {
  if (!dateStr || !minStr) return false;
  const p = parseValue(dateStr);
  const min = parseValue(minStr);
  return isBeforeMin(p.year, p.month, p.day, min, mode);
}

export { isAfterToday, isBeforeMin };
