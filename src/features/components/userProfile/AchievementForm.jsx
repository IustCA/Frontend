import { useState } from "react";
import Field from "../common/Field";
import FormActions from "../common/FormActions";
import PersianDatePicker from "../common/PersianDatePicker";
import { isAfterTodayStr } from "../common/dateUtils";

const ACHIEVEMENT_TYPES = [
  "جایزه تحصیلی",
  "رتبه مسابقه",
  "بورسیه",
  "هکاتون",
  "مقاله پژوهشی",
  "دستاورد پژوهشی",
  "دانشجوی نمونه",
];

export default function AchievementForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? { ...initial }
      : { title: "", type: ACHIEVEMENT_TYPES[0], date: "", description: "" },
  );
  const [err, setErr] = useState("");
  const [errDate, setErrDate] = useState("");
  const [errDesc, setErrDesc] = useState("");
  const submit = () => {
    if (!f.title.trim()) {
      setErr("عنوان دستاورد الزامی است۔");
      return;
    }
    if (f.title.trim().length > 255) {
      setErr("حداکثر ۲۵۵ کاراکتر۔");
      return;
    }
    const nf = (s) => String(s || "").trim().replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
    if (f.date && !/^\d{4}\/\d{1,2}$/.test(nf(f.date))) {
      setErrDate("فرمت باید YYYY/MM باشد۔");
      return;
    }
    if (f.date && isAfterTodayStr(f.date, "monthYear")) {
      setErrDate("تاریخ نمی‌تواند بعد از امروز باشد۔");
      return;
    }
    if (f.description && f.description.length > 500) {
      setErrDesc("حداکثر ۵۰۰ کاراکتر۔");
      return;
    }
    setErrDate("");
    onSave({ ...f, title: f.title.trim() });
  };
  return (
    <div className="form-box no-print">
      <Field id="ah-title" label="عنوان دستاورد" required error={err}>
        <input autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" autoComplete="off" name="ah-title_no_autofill" id="ah-title" className={"input" + (err ? " err" : "")} value={f.title} placeholder="مثلاً رتبهٔ اول هکاتون" onChange={(e) => { setF({ ...f, title: e.target.value }); setErr(""); }} maxLength={255} />
      </Field>
      <div className="grid-2">
        <Field id="ah-type" label="نوع دستاورد">
          <select autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" autoComplete="off" id="ah-type" className="input" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
            {ACHIEVEMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <PersianDatePicker id="ah-date" label="تاریخ" error={errDate} value={f.date} onChange={(v) => setF({ ...f, date: v })} mode="monthYear" maxToday />
      </div>
      <Field id="ah-desc" label="توضیحات" error={errDesc}>
        <textarea autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" autoComplete="off" name="ah-desc_no_autofill" id="ah-desc" className={"input" + (errDesc ? " err" : "")} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} maxLength={500} />
      </Field>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}
