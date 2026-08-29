import { useState } from "react";
import Field from "../common/Field";
import TagInput from "../common/TagInput";
import FormActions from "../common/FormActions";

const PROJECT_CATEGORIES = ["دانشگاهی", "شخصی", "تیمی", "پژوهشی", "متن‌باز"];
const TEAM_OPTIONS = ["فردی", "تیمی"];

export default function ProjectForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(
    initial
      ? { ...initial }
      : {
          title: "",
          description: "",
          technologies: [],
          category: PROJECT_CATEGORIES[0],
          startDate: "",
          endDate: "",
          github: "",
          demo: "",
          image: "",
          team: "فردی",
        },
  );
  const [errs, setErrs] = useState({});
  const submit = () => {
    const e = {};
    if (!f.title.trim()) e.title = "عنوان پروژه الزامی است۔";
    if (!f.description.trim()) e.description = "توضیح کوتاه پروژه الزامی است۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    onSave({ ...f });
  };
  return (
    <div className="form-box no-print">
      <Field id="pr-title" label="عنوان پروژه" required error={errs.title}>
        <input
          id="pr-title"
          className={"input" + (errs.title ? " err" : "")}
          value={f.title}
          placeholder="مثلاً وب‌اپ مدیریت پروژه"
          onChange={(e) => setF({ ...f, title: e.target.value })}
        />
      </Field>
      <Field id="pr-desc" label="توضیح کوتاه" required error={errs.description}>
        <textarea
          id="pr-desc"
          className={"input" + (errs.description ? " err" : "")}
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
        />
      </Field>
      <div className="grid-2">
        <Field id="pr-cat" label="دسته‌بندی">
          <select
            id="pr-cat"
            className="input"
            value={f.category}
            onChange={(e) => setF({ ...f, category: e.target.value })}
          >
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field id="pr-team" label="وضعیت انجام">
          <select
            id="pr-team"
            className="input"
            value={f.team}
            onChange={(e) => setF({ ...f, team: e.target.value })}
          >
            {TEAM_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid-2">
        <Field id="pr-start" label="تاریخ شروع">
          <input
            id="pr-start"
            className="input"
            value={f.startDate}
            placeholder="مثلاً فروردین ۱۴۰۳"
            onChange={(e) => setF({ ...f, startDate: e.target.value })}
          />
        </Field>
        <Field id="pr-end" label="تاریخ پایان">
          <input
            id="pr-end"
            className="input"
            value={f.endDate}
            placeholder="مثلاً دی ۱۴۰۳"
            onChange={(e) => setF({ ...f, endDate: e.target.value })}
          />
        </Field>
      </div>
      <div className="grid-2">
        <Field id="pr-github" label="پیوند گیت‌هاب">
          <input
            id="pr-github"
            dir="ltr"
            className="input"
            value={f.github}
            placeholder="https://github.com/..."
            onChange={(e) => setF({ ...f, github: e.target.value })}
          />
        </Field>
        <Field id="pr-demo" label="پیوند نمایش زنده">
          <input
            id="pr-demo"
            dir="ltr"
            className="input"
            value={f.demo}
            placeholder="https://..."
            onChange={(e) => setF({ ...f, demo: e.target.value })}
          />
        </Field>
      </div>
      <Field id="pr-img" label="آدرس تصویر پروژه (اختیاری)">
        <input
          id="pr-img"
          dir="ltr"
          className="input"
          value={f.image}
          placeholder="https://..."
          onChange={(e) => setF({ ...f, image: e.target.value })}
        />
      </Field>
      <TagInput
        id="pr-tech"
        label="فناوری‌های استفاده‌شده"
        value={f.technologies}
        onChange={(v) => setF({ ...f, technologies: v })}
        placeholder="مثلاً React"
      />
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}
