import { useState } from "react";
import Field from "../common/Field";
import TagInput from "../common/TagInput";
import FormActions from "../common/FormActions";
import PersianDatePicker from "../common/PersianDatePicker";

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
    const nf = (s) => String(s || "").trim().replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
    if (!f.degree.trim()) e.degree = "مقطع تحصیلی الزامی است۔";
    else if (f.degree.trim().length > 100) e.degree = "حداکثر ۱۰۰ کاراکتر۔";
    if (!f.field.trim()) e.field = "رشتهٔ تحصیلی الزامی است۔";
    else if (f.field.trim().length > 150) e.field = "حداکثر ۱۵۰ کاراکتر۔";
    if (!f.university.trim()) e.university = "نام دانشگاه یا مؤسسه الزامی است۔";
    else if (f.university.trim().length > 200) e.university = "حداکثر ۲۰۰ کاراکتر۔";
    if (!f.startDate.trim()) e.startDate = "تاریخ شروع الزامی است۔";
    else if (!/^\d{4}\/\d{1,2}$/.test(nf(f.startDate))) e.startDate = "فرمت باید YYYY/MM باشد۔";
    if (!f.ongoing && f.endDate && !/^\d{4}\/\d{1,2}$/.test(nf(f.endDate))) e.endDate = "فرمت باید YYYY/MM باشد۔";
    if (f.gpa && !/^[0-9۰-۹.\/]+$/.test(f.gpa.trim())) e.gpa = "معدل باید عدد باشد۔";
    if (f.gpa && f.gpa.length > 20) e.gpa = "حداکثر ۲۰ کاراکتر۔";
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
        <Field id="ed-degree" label="مقطع تحصیلی" required error={errs.degree}>
          <input autoComplete="off" id="ed-degree" className={"input" + (errs.degree ? " err" : "")} value={f.degree} placeholder="مثلاً کارشناسی" onChange={(e) => setF({ ...f, degree: e.target.value })} maxLength={100} />
        </Field>
        <Field id="ed-field" label="رشتهٔ تحصیلی" required error={errs.field}>
          <input autoComplete="off" id="ed-field" className={"input" + (errs.field ? " err" : "")} value={f.field} placeholder="مثلاً مهندسی کامپیوتر" onChange={(e) => setF({ ...f, field: e.target.value })} maxLength={150} />
        </Field>
      </div>
      <Field id="ed-uni" label="دانشگاه / مؤسسه" required error={errs.university}>
        <input autoComplete="off" id="ed-uni" className={"input" + (errs.university ? " err" : "")} value={f.university} placeholder="مثلاً دانشگاه تهران" onChange={(e) => setF({ ...f, university: e.target.value })} maxLength={200} />
      </Field>
      <div className="grid-2">
        <PersianDatePicker id="ed-start" label="تاریخ شروع" required error={errs.startDate} value={f.startDate} onChange={(v) => setF({ ...f, startDate: v })} mode="monthYear" />
        {!f.ongoing ? (
          <PersianDatePicker id="ed-end" label="تاریخ پایان" error={errs.endDate} value={f.endDate} onChange={(v) => setF({ ...f, endDate: v })} mode="monthYear" />
        ) : null}
      </div>
      <label className="check-row">
        <input
          autoComplete="off"
          type="checkbox"
          checked={f.ongoing}
          onChange={(e) => setF({ ...f, ongoing: e.target.checked, endDate: e.target.checked ? "" : f.endDate })}
        />
        در حال تحصیل
      </label>
      <Field id="ed-gpa" label="معدل" error={errs.gpa}>
        <input autoComplete="off" id="ed-gpa" className={"input" + (errs.gpa ? " err" : "")} value={f.gpa} placeholder="مثلاً ۱۸٫۲" onChange={(e) => setF({ ...f, gpa: e.target.value })} maxLength={20} />
      </Field>
      <Field id="ed-desc" label="توضیحات" error={errs.description}>
        <textarea autoComplete="off" id="ed-desc" className={"input" + (errs.description ? " err" : "")} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} maxLength={800} />
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
