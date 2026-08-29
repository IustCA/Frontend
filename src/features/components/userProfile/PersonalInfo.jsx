import Icon from "../common/Icon";
import SectionCard from "../common/SectionCard";
import Field from "../common/Field";

function PersonalInfo({ editMode, p, updatePersonal, personalErrors }) {
  return (
    <SectionCard icon="user" title="اطلاعات شخصی" titleId="personal-title">
      {editMode ? (
        <div className="no-print">
          <div className="grid-2">
            <Field id="pi-birth" label="تاریخ تولد">
              <input
                id="pi-birth"
                className="input"
                value={p.birthDate}
                placeholder="مثلاً ۱۳۸۲/۰۵/۱۴"
                onChange={(e) => updatePersonal("birthDate", e.target.value)}
              />
            </Field>
            <Field id="pi-stud" label="شمارهٔ دانشجویی">
              <input
                id="pi-stud"
                className="input"
                value={p.studentId}
                onChange={(e) => updatePersonal("studentId", e.target.value)}
              />
            </Field>
          </div>
          <Field
            id="pi-email"
            label="ایمیل"
            required
            error={personalErrors.email}
          >
            <input
              id="pi-email"
              dir="ltr"
              type="email"
              className={"input" + (personalErrors.email ? " err" : "")}
              value={p.email}
              onChange={(e) => updatePersonal("email", e.target.value)}
            />
          </Field>
          <Field id="pi-phone" label="شمارهٔ تماس">
            <input
              id="pi-phone"
              className="input"
              value={p.phone}
              placeholder="مثلاً ۰۹۱۲ ۳۴۵ ۶۷۸۹"
              onChange={(e) => updatePersonal("phone", e.target.value)}
            />
          </Field>
          <Field id="pi-linkedin" label="لینکدین">
            <input
              id="pi-linkedin"
              dir="ltr"
              className="input"
              value={p.linkedin}
              onChange={(e) => updatePersonal("linkedin", e.target.value)}
            />
          </Field>
          <Field id="pi-github" label="گیت‌هاب">
            <input
              id="pi-github"
              dir="ltr"
              className="input"
              value={p.github}
              onChange={(e) => updatePersonal("github", e.target.value)}
            />
          </Field>
          <Field id="pi-web" label="وب‌سایت شخصی">
            <input
              id="pi-web"
              dir="ltr"
              className="input"
              value={p.website}
              placeholder="https://..."
              onChange={(e) => updatePersonal("website", e.target.value)}
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
          {p.studentId ? (
            <div className="info-row">
              <span className="ic">
                <Icon name="hash" size={15} />
              </span>
              <div>
                <span className="lbl">شمارهٔ دانشجویی</span>
                <span className="val">{p.studentId}</span>
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
