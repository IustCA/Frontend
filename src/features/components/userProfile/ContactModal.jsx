import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Icon from "../common/Icon";
import Field from "../common/Field";

export default function ContactModal({
  open,
  onClose,
  showToast,
  toastTimer,
  isValidEmail,
}) {
  const dispatch = useDispatch();
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const firstRef = useRef(null);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setF({ name: "", email: "", subject: "", message: "" });
      setErrs({});
      setSent(false);
      const t = setTimeout(() => {
        if (firstRef.current) firstRef.current.focus();
      }, 60);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = () => {
    const e = {};
    if (!f.name.trim()) e.name = "نام الزامی است۔";
    if (!f.email.trim()) e.email = "ایمیل الزامی است۔";
    else if (!isValidEmail(f.email)) e.email = "ایمیل واردشده معتبر نیست۔";
    if (!f.subject.trim()) e.subject = "موضوع الزامی است۔";
    if (!f.message.trim()) e.message = "متن پیام الزامی است۔";
    else if (f.message.trim().length < 10)
      e.message = "متن پیام باید حداقل ۱۰ نویسه باشد۔";
    setErrs(e);
    if (Object.keys(e).length) return;
    setSent(true);
    dispatch(showToast(toastTimer, "پیام شما با موفقیت ارسال شد۔"));
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <span className="section-icon">
            <Icon name="send" size={18} />
          </span>
          <h2 id="contact-title">ارسال پیام</h2>
          <button
            type="button"
            className="icon-btn"
            aria-label="بستن پنجره"
            onClick={onClose}
          >
            <Icon name="x" size={16} />
          </button>
        </div>
        {sent ? (
          <div className="success-box">
            <span className="big">
              <Icon name="circleCheck" size={30} />
            </span>
            <h3 style={{ fontWeight: 800 }}>پیام شما ثبت شد</h3>
            <p style={{ color: "var(--muted)", fontSize: 13.5 }}>
              از تماس شما سپاسگزارم؛ در اولین فرصت پاسخ خواهم داد۔
            </p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              بستن
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            noValidate
          >
            <div className="grid-2">
              <Field id="ct-name" label="نام" required error={errs.name}>
                <input
                  ref={firstRef}
                  id="ct-name"
                  className={"input" + (errs.name ? " err" : "")}
                  value={f.name}
                  placeholder="نام شما"
                  onChange={(e) => setF({ ...f, name: e.target.value })}
                />
              </Field>
              <Field id="ct-email" label="ایمیل" required error={errs.email}>
                <input
                  id="ct-email"
                  dir="ltr"
                  type="email"
                  className={"input" + (errs.email ? " err" : "")}
                  value={f.email}
                  placeholder="you@example.com"
                  onChange={(e) => setF({ ...f, email: e.target.value })}
                />
              </Field>
            </div>
            <Field id="ct-subject" label="موضوع" required error={errs.subject}>
              <input
                id="ct-subject"
                className={"input" + (errs.subject ? " err" : "")}
                value={f.subject}
                placeholder="مثلاً پیشنهاد همکاری"
                onChange={(e) => setF({ ...f, subject: e.target.value })}
              />
            </Field>
            <Field id="ct-msg" label="متن پیام" required error={errs.message}>
              <textarea
                id="ct-msg"
                className={"input" + (errs.message ? " err" : "")}
                value={f.message}
                placeholder="پیام خود را بنویسید..."
                onChange={(e) => setF({ ...f, message: e.target.value })}
              />
            </Field>
            <div className="form-actions" style={{ marginTop: 10 }}>
              <button type="submit" className="btn btn-primary">
                <Icon name="send" size={16} />
                ارسال پیام
              </button>
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                انصراف
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
