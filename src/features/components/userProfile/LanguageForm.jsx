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
    const name = f.name.trim();
    if (!name) {
      setErr("نام زبان الزامی است۔");
      return;
    }
    if (name.length > 50) {
      setErr("حداکثر ۵۰ کاراکتر۔");
      return;
    }
    if (name.length < 2) {
      setErr("حداقل ۲ کاراکتر۔");
      return;
    }
    onSave({ ...f, name });
  };
  return (
    <div className="form-box no-print">
      <Field id="lang-name" label="نام زبان" required error={err}>
        <input autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" autoComplete="off" name="lang-name_no_autofill" id="lang-name" className={"input" + (err ? " err" : "")} value={f.name} placeholder="مثلاً انگلیسی" onChange={(e) => { setF({ ...f, name: e.target.value }); setErr(""); }} maxLength={50} />
      </Field>
      <Field id="lang-level" label="سطح تسلط">
        <select autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" autoComplete="off"
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
