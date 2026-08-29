import { useState } from "react";
import Field from "../common/Field";
import FormActions from "../common/FormActions";

const ACHIEVEMENT_TYPES = [
  "جایزه تحصیلی",
  "رتبه مسابقه",
  "بورسیه",
  "هکاتون",
  "مقاله پژوهشی",
  "دستاورد پژوهشی",
  "دانشجوی نمونه",
];

export default function AchievementForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? { ...initial }
      : { title: "", type: ACHIEVEMENT_TYPES[0], date: "", description: "" },
  );
  const [err, setErr] = useState("");
  const submit = () => {
    if (!f.title.trim()) {
      setErr("عنوان دستاورد الزامی است۔");
      return;
    }
    onSave({ ...f, title: f.title.trim() });
  };
  return (
    <div className="form-box no-print">
      <Field id="ah-title" label="عنوان دستاورد" required error={err}>
        <input
          id="ah-title"
          className={"input" + (err ? " err" : "")}
          value={f.title}
          placeholder="مثلاً رتبهٔ اول هکاتون"
          onChange={(e) => {
            setF({ ...f, title: e.target.value });
            setErr("");
          }}
        />
      </Field>
      <div className="grid-2">
        <Field id="ah-type" label="نوع دستاورد">
          <select
            id="ah-type"
            className="input"
            value={f.type}
            onChange={(e) => setF({ ...f, type: e.target.value })}
          >
            {ACHIEVEMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field id="ah-date" label="تاریخ">
          <input
            id="ah-date"
            className="input"
            value={f.date}
            placeholder="مثلاً آذر ۱۴۰۳"
            onChange={(e) => setF({ ...f, date: e.target.value })}
          />
        </Field>
      </div>
      <Field id="ah-desc" label="توضیحات">
        <textarea
          id="ah-desc"
          className="input"
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
        />
      </Field>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}
