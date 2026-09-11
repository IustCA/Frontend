import Icon from "../common/Icon";
import SectionCard from "../common/SectionCard";
import Field from "../common/Field";
import PersianDatePicker from "../common/PersianDatePicker";

function PersonalInfo({ editMode, p, updatePersonal, personalErrors }) {
  const toEn = (s) =>
    String(s || "").replace(
      /[۰-۹]/g,
      (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)],
    );
  const handlePhoneChange = (e) => {
    let v = toEn(e.target.value).replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    updatePersonal("phone", v);
  };
  const handlePhoneKeyDown = (e) => {
    const allowed = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  };
  const handlePhonePaste = (e) => {
    e.preventDefault();
    let v = toEn(e.clipboardData.getData("text"))
      .replace(/\D/g, "")
      .slice(0, 11);
    updatePersonal("phone", v);
  };
  return (
    <SectionCard icon="user" title="اطلاعات شخصی" titleId="personal-title">
      {editMode ? (
        <div className="no-print">
          <PersianDatePicker
            id="pi-birth"
            label="تاریخ تولد"
            value={p.birthDate}
            onChange={(v) => updatePersonal("birthDate", v)}
            mode="full"
            error={personalErrors.birthDate}
            maxToday
          />
          <Field id="pi-phone" label="شمارهٔ تماس" error={personalErrors.phone}>
            <input
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-lpignore="true"
              data-form-type="other"
              name="phone_no_autofill"
              id="pi-phone"
              className={"input ltr" + (personalErrors.phone ? " err" : "")}
              value={p.phone}
              placeholder="09123456789"
              onChange={handlePhoneChange}
              onKeyDown={handlePhoneKeyDown}
              onPaste={handlePhonePaste}
              inputMode="numeric"
              pattern="09[0-9]{9}"
              maxLength={11}
              dir="ltr"
            />
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
              {" "}
              فقط عدد، ۱۱ رقم با 09 شروع شود
            </div>
          </Field>
          <Field id="pi-email" label="ایمیل" error={personalErrors.email}>
            <input
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-lpignore="true"
              data-form-type="other"
              autoComplete="off"
              name="pi-email_no_autofill"
              id="pi-email"
              dir="ltr"
              type="email"
              className={"input ltr" + (personalErrors.email ? " err" : "")}
              value={p.email || ""}
              onChange={(e) => updatePersonal("email", e.target.value)}
              maxLength={254}
              placeholder="example@mail.com"
              inputMode="email"
            />
          </Field>
          <Field
            id="pi-linkedin"
            label="لینکدین"
            error={personalErrors.linkedin}
          >
            <input
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-lpignore="true"
              data-form-type="other"
              autoComplete="off"
              name="pi-linkedin_no_autofill"
              id="pi-linkedin"
              dir="ltr"
              className={"input" + (personalErrors.linkedin ? " err" : "")}
              value={p.linkedin}
              onChange={(e) => updatePersonal("linkedin", e.target.value)}
              maxLength={255}
              placeholder="https://linkedin.com/in/..."
            />
          </Field>
          <Field id="pi-github" label="گیت‌هاب" error={personalErrors.github}>
            <input
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-lpignore="true"
              data-form-type="other"
              autoComplete="off"
              name="pi-github_no_autofill"
              id="pi-github"
              dir="ltr"
              className={"input" + (personalErrors.github ? " err" : "")}
              value={p.github}
              onChange={(e) => updatePersonal("github", e.target.value)}
              maxLength={255}
              placeholder="https://github.com/..."
            />
          </Field>
          <Field
            id="pi-web"
            label="وب‌سایت شخصی"
            error={personalErrors.website}
          >
            <input
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-lpignore="true"
              data-form-type="other"
              autoComplete="off"
              name="pi-web_no_autofill"
              id="pi-web"
              dir="ltr"
              className={"input" + (personalErrors.website ? " err" : "")}
              value={p.website}
              placeholder="https://..."
              onChange={(e) => updatePersonal("website", e.target.value)}
              maxLength={255}
            />
          </Field>
        </div>
      ) : (
        <>
          {p.birthDate ? (
            <div className="info-row">
              <span className="ic">
                <Icon name="calendar" size={15} />
              </span>
              <div>
                <span className="lbl">تاریخ تولد</span>
                <span className="val">{p.birthDate}</span>
              </div>
            </div>
          ) : null}
          {p.email ? (
            <div className="info-row">
              <span className="ic">
                <Icon name="mail" size={15} />
              </span>
              <div>
                <span className="lbl">ایمیل</span>
                <span className="val ltr">{p.email}</span>
              </div>
            </div>
          ) : null}
          <div className="info-row">
            <span className="ic">
              <Icon name="mapPin" size={15} />
            </span>
            <div>
              <span className="lbl">شهر محل سکونت</span>
              <span className="val">{p.city}</span>
            </div>
          </div>
          {p.linkedin ? (
            <div className="info-row">
              <span className="ic">
                <Icon name="linkedin" size={15} />
              </span>
              <div>
                <span className="lbl">لینکدین</span>
                <span className="val ltr">{p.linkedin}</span>
              </div>
            </div>
          ) : null}
          {p.github ? (
            <div className="info-row">
              <span className="ic">
                <Icon name="github" size={15} />
              </span>
              <div>
                <span className="lbl">گیت‌هاب</span>
                <span className="val ltr">{p.github}</span>
              </div>
            </div>
          ) : null}
          {p.website ? (
            <div className="info-row">
              <span className="ic">
                <Icon name="globe" size={15} />
              </span>
              <div>
                <span className="lbl">وب‌سایت شخصی</span>
                <span className="val ltr">{p.website}</span>
              </div>
            </div>
          ) : null}
        </>
      )}
    </SectionCard>
  );
}

export default PersonalInfo;
