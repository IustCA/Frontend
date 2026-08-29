import { useState } from "react";
import Field from "../common/Field";
import FormActions from "../common/FormActions";

export default function ActivityForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? { ...initial }
      : {
          title: "",
          organization: "",
          role: "",
          date: "",
          description: "",
          achievements: "",
        },
  );
  const [errs, setErrs] = useState({});
  const submit = () => {
    const e = {};
    if (!f.title.trim()) e.title = "عنوان فعالیت الزامی است۔";
    if (!f.organization.trim())
      e.organization = "نام دانشگاه یا سازمان الزامی است۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    onSave({ ...f });
  };
  return (
    <div className="form-box no-print">
      <Field id="ac-title" label="عنوان فعالیت" required error={errs.title}>
        <input
          id="ac-title"
          className={"input" + (errs.title ? " err" : "")}
          value={f.title}
          placeholder="مثلاً عضویت در انجمن علمی"
          onChange={(e) => setF({ ...f, title: e.target.value })}
        />
      </Field>
      <div className="grid-2">
        <Field
          id="ac-org"
          label="دانشگاه / سازمان"
          required
          error={errs.organization}
        >
          <input
            id="ac-org"
            className={"input" + (errs.organization ? " err" : "")}
            value={f.organization}
            placeholder="مثلاً دانشگاه تهران"
            onChange={(e) => setF({ ...f, organization: e.target.value })}
          />
        </Field>
        <Field id="ac-role" label="نقش">
          <input
            id="ac-role"
            className="input"
            value={f.role}
            placeholder="مثلاً عضو کمیتهٔ فنی"
            onChange={(e) => setF({ ...f, role: e.target.value })}
          />
        </Field>
      </div>
      <Field id="ac-date" label="بازهٔ زمانی">
        <input
          id="ac-date"
          className="input"
          value={f.date}
          placeholder="مثلاً مهر ۱۴۰۲ تا اکنون"
          onChange={(e) => setF({ ...f, date: e.target.value })}
        />
      </Field>
      <Field id="ac-desc" label="توضیحات">
        <textarea
          id="ac-desc"
          className="input"
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
        />
      </Field>
      <Field id="ac-ach" label="دستاوردها">
        <textarea
          id="ac-ach"
          className="input"
          value={f.achievements}
          onChange={(e) => setF({ ...f, achievements: e.target.value })}
        />
      </Field>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}
