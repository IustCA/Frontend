import { useState } from "react";
import Field from "../common/Field";
import FormActions from "../common/FormActions";

const LANG_LEVELS = ["زبان مادری", "مقدماتی", "متوسط", "پیشرفته", "حرفه‌ای"];

export default function LanguageForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial ? { ...initial } : { name: "", level: "متوسط" },
  );
  const [err, setErr] = useState("");
  const submit = () => {
    if (!f.name.trim()) {
      setErr("نام زبان الزامی است۔");
      return;
    }
    onSave({ ...f, name: f.name.trim() });
  };
  return (
    <div className="form-box no-print">
      <Field id="lang-name" label="نام زبان" required error={err}>
        <input
          id="lang-name"
          className={"input" + (err ? " err" : "")}
          value={f.name}
          placeholder="مثلاً انگلیسی"
          onChange={(e) => {
            setF({ ...f, name: e.target.value });
            setErr("");
          }}
        />
      </Field>
      <Field id="lang-level" label="سطح تسلط">
        <select
          id="lang-level"
          className="input"
          value={f.level}
          onChange={(e) => setF({ ...f, level: e.target.value })}
        >
          {LANG_LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </Field>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}
