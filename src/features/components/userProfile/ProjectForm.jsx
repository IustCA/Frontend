import { useState } from "react";
import Field from "../common/Field";
import SelectWithOther from "../common/SelectWithOther";
import TagInput from "../common/TagInput";
import FormActions from "../common/FormActions";
import PersianDatePicker from "../common/PersianDatePicker";
import { isAfterTodayStr, isBeforeStr } from "../common/dateUtils";
import ImageUploader from "../common/ImageUploader";

const PROJECT_CATEGORIES = ["دانشگاهی", "شخصی", "تیمی", "پژوهشی", "متن‌باز"];
const TEAM_OPTIONS = ["فردی", "تیمی"];
const IMG_MOBILE =
  "https://image.qwenlm.ai/public_source/d4ae5256-6a4f-4e2a-b022-021cf3a0d064/191181357-05ef-41dc-a7ed-8875a3431772.png";

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
          ongoing: false,
          github: "",
          demo: "",
          image: "",
          team: "فردی",
        },
  );
  const [errs, setErrs] = useState({});
  const submit = () => {
    const e = {};
    const urlRe = /^https?:\/\/.+\..+/;
    const nf = (s) =>
      String(s || "")
        .trim()
        .replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
    if (!f.title.trim()) e.title = "عنوان پروژه الزامی است۔";
    else if (f.title.trim().length > 200) e.title = "حداکثر ۲۰۰ کاراکتر۔";
    if (!f.description.trim()) e.description = "توضیح کوتاه پروژه الزامی است۔";
    else if (f.description.trim().length > 800)
      e.description = "حداکثر ۸۰۰ کاراکتر۔";
    if (!f.category.trim()) e.category = "دسته‌بندی پروژه را مشخص کنید۔";
    if (!f.startDate.trim()) e.startDate = "تاریخ شروع الزامی است۔";
    else if (!/^\d{4}\/\d{1,2}$/.test(nf(f.startDate)))
      e.startDate = "فرمت باید YYYY/MM باشد۔";
    else if (isAfterTodayStr(f.startDate, "monthYear"))
      e.startDate = "تاریخ شروع نمی‌تواند بعد از امروز باشد۔";
    if (!f.ongoing && f.endDate && !/^\d{4}\/\d{1,2}$/.test(nf(f.endDate)))
      e.endDate = "فرمت باید YYYY/MM باشد۔";
    else if (
      !f.ongoing &&
      f.endDate &&
      isBeforeStr(f.endDate, f.startDate, "monthYear")
    )
      e.endDate = "تاریخ پایان نمی‌تواند قبل از شروع باشد۔";
    else if (!f.ongoing && f.endDate && isAfterTodayStr(f.endDate, "monthYear"))
      e.endDate = "تاریخ پایان نمی‌تواند بعد از امروز باشد۔";
    if (f.github && f.github.length > 255) e.github = "حداکثر ۲۵۵ کاراکتر۔";
    if (f.demo && !urlRe.test(f.demo))
      e.demo = "لینک باید با https:// شروع شود۔";
    if (f.demo && f.demo.length > 255) e.demo = "حداکثر ۲۵۵ کاراکتر۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    const payload = { ...f };
    if (payload.ongoing) payload.endDate = "";
    onSave(payload);
  };
  return (
    <div className="form-box no-print">
      <Field id="pr-title" label="عنوان پروژه" required error={errs.title}>
        <input
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          autoComplete="off"
          name="pr-title_no_autofill"
          id="pr-title"
          className={"input" + (errs.title ? " err" : "")}
          value={f.title}
          placeholder="مثلاً وب‌اپ مدیریت پروژه"
          onChange={(e) => setF({ ...f, title: e.target.value })}
          maxLength={200}
        />
      </Field>
      <Field id="pr-desc" label="توضیح کوتاه" required error={errs.description}>
        <textarea
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          autoComplete="off"
          name="pr-desc_no_autofill"
          id="pr-desc"
          className={"input" + (errs.description ? " err" : "")}
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
          maxLength={800}
        />
      </Field>
      <div className="grid-2">
        <SelectWithOther
          id="pr-cat"
          label="دسته‌بندی"
          value={f.category}
          onChange={(v) => setF({ ...f, category: v })}
          options={PROJECT_CATEGORIES}
          placeholder="دسته‌بندی پروژه را وارد کنید"
          error={errs.category}
        />
        <Field id="pr-team" label="وضعیت انجام">
          <select
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-form-type="other"
            autoComplete="off"
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
        <PersianDatePicker
          id="pr-start"
          label="تاریخ شروع"
          required
          error={errs.startDate}
          value={f.startDate}
          onChange={(v) => setF({ ...f, startDate: v })}
          mode="monthYear"
          maxToday
        />
        {!f.ongoing ? (
          <PersianDatePicker
            id="pr-end"
            label="تاریخ پایان"
            error={errs.endDate}
            value={f.endDate}
            onChange={(v) => setF({ ...f, endDate: v })}
            mode="monthYear"
            maxToday
            minDate={f.startDate}
          />
        ) : null}
      </div>
      <label className="check-row">
        <input
          name="no_autofill_random"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          autoComplete="off"
          type="checkbox"
          checked={!!f.ongoing}
          onChange={(e) =>
            setF({
              ...f,
              ongoing: e.target.checked,
              endDate: e.target.checked ? "" : f.endDate,
            })
          }
        />
        هنوز در حال ادامه پروژه هستم
      </label>
      <div className="grid-2">
        <Field id="pr-github" label="پیوند گیت‌هاب" error={errs.github}>
          <input
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-form-type="other"
            autoComplete="off"
            name="pr-github_no_autofill"
            id="pr-github"
            dir="ltr"
            className={"input" + (errs.github ? " err" : "")}
            value={f.github}
            placeholder="https://github.com/..."
            onChange={(e) => setF({ ...f, github: e.target.value })}
            maxLength={255}
          />
        </Field>
        <Field id="pr-demo" label="پیوند نمایش زنده" error={errs.demo}>
          <input
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-form-type="other"
            autoComplete="off"
            name="pr-demo_no_autofill"
            id="pr-demo"
            dir="ltr"
            className={"input" + (errs.demo ? " err" : "")}
            value={f.demo}
            placeholder="https://..."
            onChange={(e) => setF({ ...f, demo: e.target.value })}
            maxLength={255}
          />
        </Field>
      </div>
      <ImageUploader
        id="pr-image"
        label="تصویر پروژه"
        value={f.image}
        onChange={(v) => setF({ ...f, image: v })}
        placeholder={IMG_MOBILE}
        maxSizeMB={2}
        minWidth={300}
        minHeight={180}
      />
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
