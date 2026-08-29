import { useState } from "react";
import Field from "../common/Field";
import TagInput from "../common/TagInput";
import FormActions from "../common/FormActions";

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
