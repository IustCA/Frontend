import { useState } from "react";
import Field from "../common/Field";
import FormActions from "../common/FormActions";
import PersianDatePicker from "../common/PersianDatePicker";
import { isAfterTodayStr, isBeforeStr } from "../common/dateUtils";

export default function ActivityForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(() => {
    if (initial) {
      const m = { ...initial };
      if (m.date && !m.startDate) {
        const parts = String(m.date).split("تا");
        m.startDate = parts[0]?.trim() || "";
        m.endDate = parts[1]?.trim() === "اکنون" ? "" : parts[1]?.trim() || "";
        m.ongoing = String(m.date).includes("اکنون");
      }
      return {
        startDate: "",
        endDate: "",
        ongoing: false,
        title: "",
        organization: "",
        role: "",
        description: "",
        achievements: "",
        ...m,
      };
    }
    return {
      title: "",
      organization: "",
      role: "",
      startDate: "",
      endDate: "",
      ongoing: false,
      description: "",
      achievements: "",
    };
  });
  const [errs, setErrs] = useState({});
  const submit = () => {
    const e = {};
    const nf = (s) =>
      String(s || "")
        .trim()
        .replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
    if (!f.title.trim()) e.title = "عنوان فعالیت الزامی است۔";
    else if (f.title.trim().length > 200) e.title = "حداکثر ۲۰۰ کاراکتر۔";
    if (!f.organization.trim())
      e.organization = "نام دانشگاه یا سازمان الزامی است۔";
    else if (f.organization.trim().length > 200)
      e.organization = "حداکثر ۲۰۰ کاراکتر۔";
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
    if (f.role && f.role.length > 150) e.role = "حداکثر ۱۵۰ کاراکتر۔";
    if (f.description && f.description.length > 800)
      e.description = "حداکثر ۸۰۰ کاراکتر۔";
    if (f.achievements && f.achievements.length > 800)
      e.achievements = "حداکثر ۸۰۰ کاراکتر۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    const payload = { ...f };
    if (payload.ongoing) payload.endDate = "";
    if (payload.startDate) {
      payload.date = payload.ongoing
        ? `${payload.startDate} تا اکنون`
        : payload.endDate
          ? `${payload.startDate} تا ${payload.endDate}`
          : payload.startDate;
    }
    onSave(payload);
  };
  return (
    <div className="form-box no-print">
      <Field id="ac-title" label="عنوان فعالیت" required error={errs.title}>
        <input
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          autoComplete="off"
          name="ac-title_no_autofill"
          id="ac-title"
          className={"input" + (errs.title ? " err" : "")}
          value={f.title}
          placeholder="مثلاً عضویت در انجمن علمی"
          onChange={(e) => setF({ ...f, title: e.target.value })}
          maxLength={200}
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
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-form-type="other"
            autoComplete="off"
            name="ac-org_no_autofill"
            id="ac-org"
            className={"input" + (errs.organization ? " err" : "")}
            value={f.organization}
            placeholder="مثلاً دانشگاه تهران"
            onChange={(e) => setF({ ...f, organization: e.target.value })}
            maxLength={200}
          />
        </Field>
        <Field id="ac-role" label="نقش" error={errs.role}>
          <input
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-form-type="other"
            autoComplete="off"
            name="ac-role_no_autofill"
            id="ac-role"
            className={"input" + (errs.role ? " err" : "")}
            value={f.role}
            placeholder="مثلاً عضو کمیتهٔ فنی"
            onChange={(e) => setF({ ...f, role: e.target.value })}
            maxLength={150}
          />
        </Field>
      </div>
      <div className="grid-2">
        <PersianDatePicker
          id="ac-start"
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
            id="ac-end"
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
        در حال انجام
      </label>
      <Field id="ac-desc" label="توضیحات" error={errs.description}>
        <textarea
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          autoComplete="off"
          name="ac-desc_no_autofill"
          id="ac-desc"
          className={"input" + (errs.description ? " err" : "")}
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
          maxLength={800}
        />
      </Field>
      <Field id="ac-ach" label="دستاوردها" error={errs.achievements}>
        <textarea
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          autoComplete="off"
          name="ac-ach_no_autofill"
          id="ac-ach"
          className={"input" + (errs.achievements ? " err" : "")}
          value={f.achievements}
          onChange={(e) => setF({ ...f, achievements: e.target.value })}
          maxLength={800}
        />
      </Field>
      <FormActions onSave={submit} onCancel={onCancel} />
    </div>
  );
}
