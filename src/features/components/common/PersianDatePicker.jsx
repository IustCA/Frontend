import { useEffect, useState } from "react";
import {
  PERSIAN_MONTHS,
  toPersianDigits,
  parseValue,
  getTodayJalali,
} from "./dateUtils";

const YEARS = Array.from({ length: 81 }, (_, i) => String(1410 - i));
const DAYS = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);

export default function PersianDatePicker({
  id,
  label,
  value,
  onChange,
  required,
  error,
  mode = "monthYear",
  maxToday = true,
  minDate = "",
}) {
  const parsed = parseValue(value);
  const [year, setYear] = useState(parsed.year);
  const [month, setMonth] = useState(parsed.month);
  const [day, setDay] = useState(parsed.day);
  const today = getTodayJalali();
  const minParsed = minDate ? parseValue(minDate) : null;

  useEffect(() => {
    const p = parseValue(value);
    setYear(p.year);
    setMonth(p.month);
    setDay(p.day);
  }, [value]);

  const emit = (y, m, d) => {
    if (!y || !m) {
      onChange("");
      return;
    }
    const out = mode === "full" && d ? `${y}/${m}/${d}` : `${y}/${m}`;
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

  const years = YEARS;
  const days = DAYS;

  const isYearDisabled = (y) => {
    if (maxToday && Number(y) > today.jy) return true;
    if (minParsed?.year && Number(y) < Number(minParsed.year)) return true;
    return false;
  };
  const isMonthDisabled = (mVal) => {
    const m = Number(mVal);
    if (maxToday && year) {
      const y = Number(year);
      if (y === today.jy && m > today.jm) return true;
      if (y > today.jy) return true;
    }
    if (minParsed?.year && minParsed?.month && year) {
      const y = Number(year);
      const minY = Number(minParsed.year),
        minM = Number(minParsed.month);
      if (y === minY && m < minM) return true;
      if (y < minY) return true;
    }
    return false;
  };
  const isDayDisabled = (dVal) => {
    const d = Number(dVal);
    if (!year || !month) return false;
    const y = Number(year),
      m = Number(month);
    if (maxToday) {
      if (y > today.jy) return true;
      if (y === today.jy && m > today.jm) return true;
      if (y === today.jy && m === today.jm && d > today.jd) return true;
    }
    if (minParsed?.year) {
      const minY = Number(minParsed.year),
        minM = Number(minParsed.month),
        minD = Number(minParsed.day || 1);
      if (y < minY) return true;
      if (y === minY && m < minM) return true;
      if (y === minY && m === minM && d < minD) return true;
    }
    return false;
  };

  return (
    <div className="field">
      {label ? (
        <label
          htmlFor={id}
          style={{
            display: "block",
            fontSize: 12.5,
            fontWeight: 700,
            color: "#3d4664",
            marginBottom: 5,
          }}
        >
          {label}{" "}
          {required ? <span style={{ color: "var(--red)" }}>*</span> : null}
        </label>
      ) : null}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mode === "full" ? "1fr 1fr 1fr" : "1fr 1fr",
          gap: 8,
        }}
      >
        <select
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          id={`${id}-year`}
          className={`input${error ? " err" : ""}`}
          value={year}
          onChange={handleYear}
        >
          <option value="">سال</option>
          {years.map((y) => (
            <option key={y} value={y} disabled={isYearDisabled(y)}>
              {toPersianDigits(y)}
            </option>
          ))}
        </select>
        <select
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          id={`${id}-month`}
          className={`input${error ? " err" : ""}`}
          value={month}
          onChange={handleMonth}
        >
          <option value="">ماه</option>
          {PERSIAN_MONTHS.map((m, idx) => {
            const val = String(idx + 1).padStart(2, "0");
            return (
              <option key={val} value={val} disabled={isMonthDisabled(val)}>
                {m}
              </option>
            );
          })}
        </select>
        {mode === "full" ? (
          <select
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-form-type="other"
            id={`${id}-day`}
            className={`input${error ? " err" : ""}`}
            value={day}
            onChange={handleDay}
          >
            <option value="">روز</option>
            {days.map((d) => (
              <option key={d} value={d} disabled={isDayDisabled(d)}>
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
