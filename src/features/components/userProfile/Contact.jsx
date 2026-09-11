import Icon from "../common/Icon";
import SectionCard from "../common/SectionCard";

export default function Contact({ p }) {
  return (
    <SectionCard icon="mail" title="اطلاعات تماس" titleId="contact-side-title">
      {p.phone ? (
        <div className="info-row">
          <span className="ic">
            <Icon name="phone" size={15} />
          </span>
          <div>
            <span className="lbl">شمارهٔ تماس</span>
            <span className="val">{p.phone}</span>
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
            <span className="lbl">وب‌سایت</span>
            <span className="val ltr">{p.website}</span>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}
