import { useState } from "react";
import Field from "../common/Field";
import FormActions from "../common/FormActions";

const LEVELS = ["مقدماتی", "متوسط", "پیشرفته", "حرفه‌ای"];

export default function SkillForm({
  initial,
  onSave,
  onCancel,
  SKILL_CATEGORIES,
}) {
  const [f, setF] = useState(
    initial
      ? { ...initial }
      : { name: "", level: "متوسط", category: SKILL_CATEGORIES[0] },
  );
  const [err, setErr] = useState("");
  const submit = () => {
    if (!f.name.trim()) {
      setErr("نام مهارت الزامی است۔");
      return;
    }
    onSave({ ...f, name: f.name.trim() });
  };
  return (
    <div className="form-box no-print">
      <Field id="skill-name" label="نام مهارت" required error={err}>
        <input
          id="skill-name"
          className={"input" + (err ? " err" : "")}
          value={f.name}
          placeholder="مثلاً React"
          onChange={(e) => {
            setF({ ...f, name: e.target.value });
            setErr("");
          }}
        />
      </Field>
      <div className="grid-2">
        <Field id="skill-level" label="سطح مهارت">
          <select
            id="skill-level"
            className="input"
            value={f.level}
            onChange={(e) => setF({ ...f, level: e.target.value })}
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field id="skill-cat" label="دسته‌بندی">
          <select
            id="skill-cat"
            className="input"
            value={f.category}
            onChange={(e) => setF({ ...f, category: e.target.value })}
          >
            {SKILL_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}
