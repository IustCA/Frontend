import Icon from "../common/Icon";
import SectionCard from "../common/SectionCard";
import Field from "../common/Field";
import PersianDatePicker from "../common/PersianDatePicker";

function PersonalInfo({ editMode, p, updatePersonal, personalErrors }) {
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
          />
          <Field id="pi-phone" label="شمارهٔ تماس" error={personalErrors.phone}>
            <input
              autoComplete="off"
              id="pi-phone"
              className={"input" + (personalErrors.phone ? " err" : "")}
              value={p.phone}
              placeholder="مثلاً ۰۹۱۲ ۳۴۵ ۶۷۸۹"
              onChange={(e) => updatePersonal("phone", e.target.value)}
              maxLength={30}
            />
          </Field>
          <Field id="pi-linkedin" label="لینکدین" error={personalErrors.linkedin}>
            <input
              autoComplete="off"
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
              autoComplete="off"
              id="pi-github"
              dir="ltr"
              className={"input" + (personalErrors.github ? " err" : "")}
              value={p.github}
              onChange={(e) => updatePersonal("github", e.target.value)}
              maxLength={255}
              placeholder="https://github.com/..."
            />
          </Field>
          <Field id="pi-web" label="وب‌سایت شخصی" error={personalErrors.website}>
            <input
              autoComplete="off"
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
          {p.username ? (
            <div className="info-row">
              <span className="ic">
                <Icon name="user" size={15} />
              </span>
              <div>
                <span className="lbl">نام کاربری</span>
                <span className="val ltr">{p.username}</span>
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
