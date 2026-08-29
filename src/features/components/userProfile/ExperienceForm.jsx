import { useState } from "react";
import Field from "../common/Field";
import TagInput from "../common/TagInput";
import FormActions from "../common/FormActions";
import PersianDatePicker from "../common/PersianDatePicker";
import { isAfterTodayStr, isBeforeStr } from "../common/dateUtils";

const EMPLOYMENT_TYPES = [
  "تمام‌وقت",
  "پاره‌وقت",
  "کارآموزی",
  "پروژه‌ای",
  "دورکاری",
  "داوطلبانه",
];

export default function ExperienceForm({ initial, onSave, onCancel }) {
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
    const nf = (s) => String(s || "").trim().replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
    if (!f.jobTitle.trim()) e.jobTitle = "عنوان شغلی الزامی است۔";
    else if (f.jobTitle.trim().length > 200) e.jobTitle = "حداکثر ۲۰۰ کاراکتر۔";
    if (!f.company.trim()) e.company = "نام شرکت یا سازمان الزامی است۔";
    else if (f.company.trim().length > 200) e.company = "حداکثر ۲۰۰ کاراکتر۔";
    if (!f.startDate.trim()) e.startDate = "تاریخ شروع الزامی است۔";
    else if (!/^\d{4}\/\d{1,2}$/.test(nf(f.startDate))) e.startDate = "فرمت باید YYYY/MM باشد۔";
    else if (isAfterTodayStr(f.startDate, "monthYear")) e.startDate = "تاریخ شروع نمی‌تواند بعد از امروز باشد۔";
    if (!f.ongoing && f.endDate && !/^\d{4}\/\d{1,2}$/.test(nf(f.endDate))) e.endDate = "فرمت باید YYYY/MM باشد۔";
    else if (!f.ongoing && f.endDate && isBeforeStr(f.endDate, f.startDate, "monthYear")) e.endDate = "تاریخ پایان نمی‌تواند قبل از شروع باشد۔";
    else if (!f.ongoing && f.endDate && isAfterTodayStr(f.endDate, "monthYear")) e.endDate = "تاریخ پایان نمی‌تواند بعد از امروز باشد۔";
    if (f.location && f.location.length > 200) e.location = "حداکثر ۲۰۰ کاراکتر۔";
    if (f.description && f.description.length > 800) e.description = "حداکثر ۸۰۰ کاراکتر۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    const payload = { ...f };
    if (payload.ongoing) payload.endDate = "";
    onSave(payload);
  };
  return (
    <div className="form-box no-print">
      <div className="grid-2">
        <Field id="ex-title" label="عنوان شغلی" required error={errs.jobTitle}>
          <input autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" autoComplete="off" name="ex-title_no_autofill" id="ex-title" className={"input" + (errs.jobTitle ? " err" : "")} value={f.jobTitle} placeholder="مثلاً کارآموز توسعهٔ فرانت‌اند" onChange={(e) => setF({ ...f, jobTitle: e.target.value })} maxLength={200} />
        </Field>
        <Field id="ex-company" label="شرکت / سازمان" required error={errs.company}>
          <input autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" autoComplete="off" name="ex-company_no_autofill" id="ex-company" className={"input" + (errs.company ? " err" : "")} value={f.company} placeholder="مثلاً شرکت فناوری آریاتک" onChange={(e) => setF({ ...f, company: e.target.value })} maxLength={200} />
        </Field>
      </div>
      <div className="grid-2">
        <Field id="ex-type" label="نوع همکاری">
          <select autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" autoComplete="off" id="ex-type" className="input" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field id="ex-loc" label="محل کار" error={errs.location}>
          <input autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" autoComplete="off" name="ex-loc_no_autofill" id="ex-loc" className={"input" + (errs.location ? " err" : "")} value={f.location} placeholder="مثلاً تهران / دورکاری" onChange={(e) => setF({ ...f, location: e.target.value })} maxLength={200} />
        </Field>
      </div>
      <div className="grid-2">
        <PersianDatePicker id="ex-start" label="تاریخ شروع" required error={errs.startDate} value={f.startDate} onChange={(v) => setF({ ...f, startDate: v })} mode="monthYear" maxToday />
        {!f.ongoing ? (
          <PersianDatePicker id="ex-end" label="تاریخ پایان" error={errs.endDate} value={f.endDate} onChange={(v) => setF({ ...f, endDate: v })} mode="monthYear" maxToday minDate={f.startDate} />
        ) : null}
      </div>
      <label className="check-row">
        <input name="no_autofill_random" autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" autoComplete="off" type="checkbox" checked={f.ongoing} onChange={(e) => setF({ ...f, ongoing: e.target.checked, endDate: e.target.checked ? "" : f.endDate })} />
        همچنان مشغول به همکاری
      </label>
      <Field id="ex-desc" label="توضیحات" error={errs.description}>
        <textarea autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" autoComplete="off" name="ex-desc_no_autofill" id="ex-desc" className={"input" + (errs.description ? " err" : "")} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} maxLength={800} />
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
