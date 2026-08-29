import { useState } from "react";
import Field from "../common/Field";
import TagInput from "../common/TagInput";
import FormActions from "../common/FormActions";

export default function EducationForm({ initial, onSave, onCancel }) {
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
