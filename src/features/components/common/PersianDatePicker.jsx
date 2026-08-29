import { useEffect, useState } from "react";

const PERSIAN_MONTHS = [
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

function toPersianDigits(str) {
  return String(str).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}
function toEnglishDigits(str) {
  return String(str).replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
}

function parseValue(value, mode) {
  const v = toEnglishDigits(String(value || "").trim());
  if (!v) return { year: "", month: "", day: "" };
  // try YYYY/MM/DD or YYYY/MM or YYYY-MM-DD
  const parts = v.split(/[\/\-]/);
  if (parts.length >= 2) {
    return {
      year: parts[0] || "",
      month: parts[1] ? String(Number(parts[1])).padStart(2, "0") : "",
      day: parts[2] ? String(Number(parts[2])).padStart(2, "0") : "",
    };
  }
  // try "مهر 1402" etc
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

export default function PersianDatePicker({
  id,
  label,
  value,
  onChange,
  required,
  error,
  mode = "monthYear", // "full" or "monthYear"
}) {
  const parsed = parseValue(value, mode);
  const [year, setYear] = useState(parsed.year);
  const [month, setMonth] = useState(parsed.month);
  const [day, setDay] = useState(parsed.day);

  useEffect(() => {
    const p = parseValue(value, mode);
    setYear(p.year);
    setMonth(p.month);
    setDay(p.day);
  }, [value, mode]);

  const emit = (y, m, d) => {
    if (!y || !m) {
      if (!y && !m && mode !== "full") {
        onChange("");
        return;
      }
      if (!y || !m) {
        // incomplete, don't emit yet but still propagate empty if cleared
        if (!y && !m) onChange("");
        return;
      }
    }
    let out = "";
    if (mode === "full") {
      if (y && m && d) out = `${y}/${m}/${d}`;
      else if (y && m) out = `${y}/${m}`;
      else out = "";
    } else {
      out = `${y}/${m}`;
    }
    onChange(out);
  };

  const handleYear = (e) => {
    const v = e.target.value;
    setYear(v);
    emit(v, month, day);
  };
  const handleMonth = (e) => {
    const v = e.target.value;
    setMonth(v);
    emit(year, v, day);
  };
  const handleDay = (e) => {
    const v = e.target.value;
    setDay(v);
    emit(year, month, v);
  };

  const years = [];
  for (let y = 1410; y >= 1310; y--) years.push(String(y));
  const days = [];
  for (let d = 1; d <= 31; d++) days.push(String(d).padStart(2, "0"));

  return (
    <div className="field">
      {label ? (
        <label htmlFor={id} style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#3d4664", marginBottom: 5 }}>
          {label} {required ? <span style={{ color: "var(--red)" }}>*</span> : null}
        </label>
      ) : null}
      <div style={{ display: "grid", gridTemplateColumns: mode === "full" ? "1fr 1fr 1fr" : "1fr 1fr", gap: 8 }}>
        <select id={`${id}-year`} className={`input${error ? " err" : ""}`} value={year} onChange={handleYear}>
          <option value="">سال</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {toPersianDigits(y)}
            </option>
          ))}
        </select>
        <select id={`${id}-month`} className={`input${error ? " err" : ""}`} value={month} onChange={handleMonth}>
          <option value="">ماه</option>
          {PERSIAN_MONTHS.map((m, idx) => {
            const val = String(idx + 1).padStart(2, "0");
            return (
              <option key={val} value={val}>
                {m}
              </option>
            );
          })}
        </select>
        {mode === "full" ? (
          <select id={`${id}-day`} className={`input${error ? " err" : ""}`} value={day} onChange={handleDay}>
            <option value="">روز</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {toPersianDigits(d)}
              </option>
            ))}
          </select>
        ) : null}
      </div>
      {error ? <span className="err-msg">{error}</span> : null}
    </div>
  );
}

export { PERSIAN_MONTHS, toPersianDigits, toEnglishDigits };
