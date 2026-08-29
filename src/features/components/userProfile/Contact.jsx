import Icon from "../common/Icon";
import SectionCard from "../common/SectionCard";

export default function Contact({ p, setContactOpen }) {
  return (
    <SectionCard icon="mail" title="اطلاعات تماس" titleId="contact-side-title">
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
      <button
        type="button"
        className="btn btn-primary"
        style={{ width: "100%", marginTop: 14 }}
        onClick={() => setContactOpen(true)}
      >
        <Icon name="send" size={16} />
        ارسال پیام
      </button>
    </SectionCard>
  );
}
