import { useState } from "react";
import Field from "../common/Field";
import FormActions from "../common/FormActions";

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
