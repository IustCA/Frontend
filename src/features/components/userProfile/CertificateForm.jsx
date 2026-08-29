import { useState } from "react";
import Field from "../common/Field";
import FormActions from "../common/FormActions";
import PersianDatePicker from "../common/PersianDatePicker";

export default function CertificateForm({ initial, onSave, onCancel }) {
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
    const urlRe = /^https?:\/\/.+\..+/;
    if (!f.name.trim()) e.name = "نام دوره یا گواهینامه الزامی است۔";
    else if (f.name.trim().length > 200) e.name = "حداکثر ۲۰۰ کاراکتر۔";
    if (!f.issuer.trim()) e.issuer = "نام صادرکننده الزامی است۔";
    else if (f.issuer.trim().length > 200) e.issuer = "حداکثر ۲۰۰ کاراکتر۔";
    const nf = (s) => String(s || "").trim().replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
    if (f.date && !/^\d{4}\/\d{1,2}$/.test(nf(f.date))) e.date = "فرمت باید YYYY/MM باشد۔";
    if (f.credentialId && f.credentialId.length > 100) e.credentialId = "حداکثر ۱۰۰ کاراکتر۔";
    if (f.link && !urlRe.test(f.link)) e.link = "لینک باید با https:// شروع شود۔";
    if (f.link && f.link.length > 255) e.link = "حداکثر ۲۵۵ کاراکتر۔";
    if (f.description && f.description.length > 500) e.description = "حداکثر ۵۰۰ کاراکتر۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    onSave({ ...f });
  };
  return (
    <div className="form-box no-print">
      <Field id="ce-name" label="نام دوره / گواهینامه" required error={errs.name}>
        <input autoComplete="off" id="ce-name" className={"input" + (errs.name ? " err" : "")} value={f.name} placeholder="مثلاً دورهٔ جامع React" onChange={(e) => setF({ ...f, name: e.target.value })} maxLength={200} />
      </Field>
      <div className="grid-2">
        <Field id="ce-issuer" label="صادرکننده" required error={errs.issuer}>
          <input autoComplete="off" id="ce-issuer" className={"input" + (errs.issuer ? " err" : "")} value={f.issuer} placeholder="مثلاً آکادمی سبزلرن" onChange={(e) => setF({ ...f, issuer: e.target.value })} maxLength={200} />
        </Field>
        <PersianDatePicker id="ce-date" label="تاریخ اخذ" error={errs.date} value={f.date} onChange={(v) => setF({ ...f, date: v })} mode="monthYear" />
      </div>
      <div className="grid-2">
        <Field id="ce-cred" label="شناسهٔ گواهینامه" error={errs.credentialId}>
          <input autoComplete="off" id="ce-cred" className={"input" + (errs.credentialId ? " err" : "")} value={f.credentialId} placeholder="مثلاً SBZ-1403-8821" onChange={(e) => setF({ ...f, credentialId: e.target.value })} maxLength={100} />
        </Field>
        <Field id="ce-link" label="پیوند گواهینامه" error={errs.link}>
          <input autoComplete="off" id="ce-link" dir="ltr" className={"input" + (errs.link ? " err" : "")} value={f.link} placeholder="https://..." onChange={(e) => setF({ ...f, link: e.target.value })} maxLength={255} />
        </Field>
      </div>
      <Field id="ce-desc" label="توضیح کوتاه" error={errs.description}>
        <textarea autoComplete="off" id="ce-desc" className={"input" + (errs.description ? " err" : "")} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} maxLength={500} />
      </Field>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}
