import { useState } from "react";
import Field from "../common/Field";
import SelectWithOther from "../common/SelectWithOther";
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
  const [catErr, setCatErr] = useState("");
  const submit = () => {
    const name = f.name.trim();
    if (!name) {
      setErr("نام مهارت الزامی است۔");
      return;
    }
    if (name.length > 80) {
      setErr("حداکثر ۸۰ کاراکتر۔");
      return;
    }
    if (name.length < 2) {
      setErr("حداقل ۲ کاراکتر۔");
      return;
    }
    if (!f.category.trim()) {
      setCatErr("دسته‌بندی مهارت را مشخص کنید۔");
      return;
    }
    onSave({ ...f, name });
  };
  return (
    <div className="form-box no-print">
      <Field id="skill-name" label="نام مهارت" required error={err}>
        <input
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          autoComplete="off"
          name="skill-name_no_autofill"
          id="skill-name"
          className={"input" + (err ? " err" : "")}
          value={f.name}
          placeholder="مثلاً React"
          onChange={(e) => {
            setF({ ...f, name: e.target.value });
            setErr("");
          }}
          maxLength={80}
        />
      </Field>
      <div className="grid-2">
        <Field id="skill-level" label="سطح مهارت">
          <select
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-form-type="other"
            autoComplete="off"
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
        <SelectWithOther
          id="skill-cat"
          label="دسته‌بندی"
          value={f.category}
          onChange={(v) => {
            setF({ ...f, category: v });
            setCatErr("");
          }}
          options={SKILL_CATEGORIES}
          placeholder="دسته‌بندی مهارت را وارد کنید"
          error={catErr}
        />
      </div>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}
