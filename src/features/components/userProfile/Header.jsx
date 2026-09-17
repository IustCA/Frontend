import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import Field from "../common/Field";
import Icon from "../common/Icon";
import { toEnglishDigits, toPersianDigits } from "../common/dateUtils";
import { showToast } from "../../shared/AppSlice";
import { getDefaultAvatar } from "../common/avatarUtils";
import PersianDatePicker from "../common/PersianDatePicker";
import CompletionRing from "./CompletionRing";
import { toExternalUrl } from "../common/urlUtils";

const AVAILABILITY_OPTIONS = [
  "آماده همکاری",
  "آماده کارآموزی",
  "فقط پروژه‌های دانشجویی",
  "در حال حاضر در دسترس نیستم",
];

const ROLE_LABELS = {
  bachelor: "کارشناسی",
  master: "کارشناسی ارشد",
  phd: "دکتری",
  alumni: "فارغ‌التحصیل",
  faculty: "هیئت علمی / استاد",
  other: "سایر",
};

export default function Header({
  p,
  editMode,
  canEdit = true,
  personalErrors,
  updatePersonal,
  toastTimer,
  profile,
  setPersonalErrors,
  setEditMode,
}) {
  const dispatch = useDispatch();
  const avatarRef = useRef(null);
  const [avatarErr, setAvatarErr] = useState("");
  const defaultAvatar = getDefaultAvatar(p.gender);

  const handlePhoneChange = (e) => {
    let v = toEnglishDigits(e.target.value).replace(/\D/g, "");
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
    const v = toEnglishDigits(e.clipboardData.getData("text"))
      .replace(/\D/g, "")
      .slice(0, 11);
    updatePersonal("phone", v);
  };

  const startEditProfile = () => {
    setPersonalErrors({});
    setEditMode(true);
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setAvatarErr("فرمت باید JPG/PNG/WEBP باشد");
      dispatch(
        showToast(
          toastTimer,
          "فرمت تصویر باید JPG، PNG یا WEBP باشد.",
          "error",
        ),
      );
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setAvatarErr("حجم حداکثر ۲MB");
      dispatch(
        showToast(
          toastTimer,
          "حجم تصویر نباید بیشتر از ۲ مگابایت باشد.",
          "error",
        ),
      );
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < 200 || img.height < 200) {
        setAvatarErr("حداقل ۲۰۰×۲۰۰");
        dispatch(
          showToast(
            toastTimer,
            "ابعاد تصویر خیلی کوچک است. حداقل ۲۰۰×۲۰۰ پیکسل.",
            "error",
          ),
        );
        URL.revokeObjectURL(url);
        return;
      }
      if (img.width > 3000 || img.height > 3000) {
        setAvatarErr("حداکثر ۳۰۰۰×۳۰۰۰");
        dispatch(showToast(toastTimer, "ابعاد تصویر خیلی بزرگ است.", "error"));
        URL.revokeObjectURL(url);
        return;
      }
      setAvatarErr("");
      const reader = new FileReader();
      reader.onload = () => updatePersonal("avatar", reader.result);
      reader.readAsDataURL(file);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      setAvatarErr("فایل معتبر نیست");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const shareProfile = async () => {
    const url = window.location.href;
    const shareTitle = "رزومهٔ دانشجویی " + profile.personal.fullName;
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareTitle, url });
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      dispatch(showToast(toastTimer, "لینک پروفایل کپی شد۔"));
    } catch {
      dispatch(
        showToast(toastTimer, "امکان اشتراک‌گذاری در دسترس نیست۔", "err"),
      );
    }
  };

  // سال ورود به دانشگاه
  const entryYear = String(p.entryYear ?? "").trim();

  const metaChips = (
    <div className="meta-chips">
      {p.university ? (
        <span className="chip">
          <Icon name="gradCap" size={14} />
          {p.university}
        </span>
      ) : null}
      {p.field ? (
        <span className="chip">
          <Icon name="book" size={14} />
          {p.field}
        </span>
      ) : null}
      {entryYear ? (
        <span className="chip">
          <Icon name="calendar" size={14} />
          {`ورودی ${toPersianDigits(entryYear)}`}
        </span>
      ) : null}
      {p.role ? (
        <span className="chip">
          <Icon name="badge" size={14} />
          {ROLE_LABELS[p.role] || p.role}
        </span>
      ) : null}
      {p.availability ? (
        <span className="badge-avail">
          <span className="dot" aria-hidden="true" />
          {p.availability}
        </span>
      ) : null}
    </div>
  );

  return (
    <header className="card header-card">
      <div className="cover" aria-hidden="true" />
      <div className="header-body">
        <div className="avatar-wrap">
          <div className="avatar" aria-label={"تصویر پروفایل " + p.fullName}>
            <span aria-hidden="true">
              {(p.fullName || "؟").trim().charAt(0)}
            </span>
            <img
              src={p.avatar || defaultAvatar}
              alt={"تصویر پروفایل " + p.fullName}
              onError={(e) => {
                e.target.src = defaultAvatar;
              }}
            />
          </div>
          {editMode ? (
            <div className="avatar-actions">
              <input
                name="no_autofill_random"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                data-lpignore="true"
                data-form-type="other"
                ref={avatarRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleAvatar}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => avatarRef.current?.click()}
              >
                <Icon name="user" size={13} />
                تغییر تصویر
              </button>
              {p.avatar ? (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => updatePersonal("avatar", "")}
                >
                  حذف تصویر
                </button>
              ) : null}
              {avatarErr ? (
                <span style={{ fontSize: 11, color: "var(--red)" }}>
                  {avatarErr}
                </span>
              ) : null}
              <span style={{ fontSize: 10, color: "var(--muted)" }}>
                حداکثر ۲MB — ۲۰۰×۲۰۰ تا ۳۰۰۰×۳۰۰۰
              </span>
            </div>
          ) : null}
        </div>

        <div className="header-info">
          {editMode ? (
            <div className="no-print">
              <div className="sub-title">مشخصات</div>
              <div className="grid-2">
                <Field
                  id="hd-name"
                  label="نام و نام خانوادگی"
                  required
                  error={personalErrors.fullName}
                >
                  <input
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-lpignore="true"
                    data-form-type="other"
                    autoComplete="off"
                    name="hd-name_no_autofill"
                    id="hd-name"
                    className={
                      "input" + (personalErrors.fullName ? " err" : "")
                    }
                    value={p.fullName}
                    readOnly
                    maxLength={60}
                    placeholder="مثلاً علی رضایی"
                  />
                </Field>
                <Field
                  id="hd-title"
                  label="عنوان حرفه‌ای"
                  error={personalErrors.title}
                >
                  <input
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-lpignore="true"
                    data-form-type="other"
                    autoComplete="off"
                    name="hd-title_no_autofill"
                    id="hd-title"
                    className={"input" + (personalErrors.title ? " err" : "")}
                    value={p.title}
                    onChange={(e) => updatePersonal("title", e.target.value)}
                    maxLength={80}
                    placeholder="مثلاً توسعه‌دهنده فرانت‌اند"
                  />
                </Field>
              </div>
              <div className="grid-2">
                <Field
                  id="hd-uni"
                  label="دانشگاه"
                  error={personalErrors.university}
                >
                  <input
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-lpignore="true"
                    data-form-type="other"
                    autoComplete="off"
                    name="hd-uni_no_autofill"
                    id="hd-uni"
                    className={
                      "input" + (personalErrors.university ? " err" : "")
                    }
                    value={p.university}
                    readOnly
                    maxLength={80}
                  />
                </Field>
                <Field
                  id="hd-field"
                  label="رشتهٔ تحصیلی"
                  error={personalErrors.field}
                >
                  <input
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-lpignore="true"
                    data-form-type="other"
                    autoComplete="off"
                    name="hd-field_no_autofill"
                    id="hd-field"
                    className={"input" + (personalErrors.field ? " err" : "")}
                    value={p.field}
                    readOnly
                    maxLength={80}
                  />
                </Field>
              </div>
              <div className="grid-2">
                <Field
                  id="hd-entryYear"
                  label="سال ورود به دانشگاه"
                  error={personalErrors.entryYear}
                >
                  <input
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-lpignore="true"
                    data-form-type="other"
                    autoComplete="off"
                    name="hd-entryYear_no_autofill"
                    id="hd-entryYear"
                    className={
                      "input" + (personalErrors.entryYear ? " err" : "")
                    }
                    value={toPersianDigits(entryYear) || 1400}
                    readOnly
                    maxLength={4}
                    inputMode="numeric"
                    placeholder="مثلاً ۱۴۰۲"
                  />
                </Field>
                <Field id="hd-avail" label="وضعیت همکاری">
                  <select
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-lpignore="true"
                    data-form-type="other"
                    autoComplete="off"
                    id="hd-avail"
                    className="input"
                    value={p.availability}
                    onChange={(e) =>
                      updatePersonal("availability", e.target.value)
                    }
                  >
                    {AVAILABILITY_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="sub-title">اطلاعات شخصی و تماس</div>
              <PersianDatePicker
                id="hd-birth"
                label="تاریخ تولد"
                value={p.birthDate}
                onChange={(v) => updatePersonal("birthDate", v)}
                mode="full"
                error={personalErrors.birthDate}
                maxToday
              />
              <div className="grid-2">
                <Field
                  id="hd-phone"
                  label="شمارهٔ تماس"
                  error={personalErrors.phone}
                >
                  <input
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-lpignore="true"
                    data-form-type="other"
                    name="hd-phone_no_autofill"
                    id="hd-phone"
                    className={
                      "input ltr" + (personalErrors.phone ? " err" : "")
                    }
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
                </Field>
                <Field id="hd-email" label="ایمیل" error={personalErrors.email}>
                  <input
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-lpignore="true"
                    data-form-type="other"
                    autoComplete="off"
                    name="hd-email_no_autofill"
                    id="hd-email"
                    dir="ltr"
                    type="email"
                    className={
                      "input ltr" + (personalErrors.email ? " err" : "")
                    }
                    value={p.email || ""}
                    onChange={(e) => updatePersonal("email", e.target.value)}
                    maxLength={254}
                    placeholder="example@mail.com"
                    inputMode="email"
                  />
                </Field>
              </div>
              <div className="grid-2">
                <Field
                  id="hd-linkedin"
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
                    name="hd-linkedin_no_autofill"
                    id="hd-linkedin"
                    dir="ltr"
                    className={
                      "input" + (personalErrors.linkedin ? " err" : "")
                    }
                    value={p.linkedin}
                    onChange={(e) => updatePersonal("linkedin", e.target.value)}
                    maxLength={255}
                    placeholder="https://linkedin.com/in/..."
                  />
                </Field>
                <Field
                  id="hd-github"
                  label="گیت‌هاب"
                  error={personalErrors.github}
                >
                  <input
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-lpignore="true"
                    data-form-type="other"
                    autoComplete="off"
                    name="hd-github_no_autofill"
                    id="hd-github"
                    dir="ltr"
                    className={"input" + (personalErrors.github ? " err" : "")}
                    value={p.github}
                    onChange={(e) => updatePersonal("github", e.target.value)}
                    maxLength={255}
                    placeholder="https://github.com/..."
                  />
                </Field>
              </div>
              <Field
                id="hd-web"
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
                  name="hd-web_no_autofill"
                  id="hd-web"
                  dir="ltr"
                  className={"input" + (personalErrors.website ? " err" : "")}
                  value={p.website}
                  placeholder="https://..."
                  onChange={(e) => updatePersonal("website", e.target.value)}
                  maxLength={255}
                />
              </Field>
              <Field
                id="hd-about"
                label="درباره من"
                required
                error={personalErrors.about}
              >
                <textarea
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  data-lpignore="true"
                  data-form-type="other"
                  autoComplete="off"
                  name="hd-about_no_autofill"
                  id="hd-about"
                  className={"input" + (personalErrors.about ? " err" : "")}
                  style={{ minHeight: 130 }}
                  value={p.about}
                  onChange={(e) => updatePersonal("about", e.target.value)}
                  maxLength={1000}
                  placeholder="حداکثر ۱۰۰۰ کاراکتر"
                />
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--muted)",
                    textAlign: "left",
                  }}
                >
                  {p.about.length}/۱۰۰۰
                </div>
              </Field>
            </div>
          ) : (
            <>
              <h1>{p.fullName}</h1>
              <p className="header-title">{p.title}</p>
            </>
          )}

          {editMode ? metaChips : null}

          {!editMode ? (
            <>
              {p.about && p.about.trim() ? (
                <p className="header-intro">{p.about}</p>
              ) : null}

              {p.birthDate ||
              p.phone ||
              p.email ||
              p.linkedin ||
              p.github ||
              p.website ? (
                <div className="header-contact">
                  {p.birthDate ? (
                    <div className="contact-item">
                      <span className="ic">
                        <Icon name="calendar" size={15} />
                      </span>
                      <div className="txt">
                        <span className="lbl">تاریخ تولد</span>
                        <span className="val">{p.birthDate}</span>
                      </div>
                    </div>
                  ) : null}
                  {p.phone ? (
                    <div className="contact-item">
                      <span className="ic">
                        <Icon name="phone" size={15} />
                      </span>
                      <div className="txt">
                        <span className="lbl">شمارهٔ تماس</span>
                        <a className="val ltr" href={`tel:${p.phone}`}>
                          {p.phone}
                        </a>
                      </div>
                    </div>
                  ) : null}
                  {p.email ? (
                    <div className="contact-item">
                      <span className="ic">
                        <Icon name="mail" size={15} />
                      </span>
                      <div className="txt">
                        <span className="lbl">ایمیل</span>
                        <a className="val ltr" href={`mailto:${p.email}`}>
                          {p.email}
                        </a>
                      </div>
                    </div>
                  ) : null}
                  {p.linkedin ? (
                    <div className="contact-item">
                      <span className="ic">
                        <Icon name="linkedin" size={15} />
                      </span>
                      <div className="txt">
                        <span className="lbl">لینکدین</span>
                        <a
                          className="val ltr"
                          href={toExternalUrl(p.linkedin)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {p.linkedin}
                        </a>
                      </div>
                    </div>
                  ) : null}
                  {p.github ? (
                    <div className="contact-item">
                      <span className="ic">
                        <Icon name="github" size={15} />
                      </span>
                      <div className="txt">
                        <span className="lbl">گیت‌هاب</span>
                        <a
                          className="val ltr"
                          href={toExternalUrl(p.github)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {p.github}
                        </a>
                      </div>
                    </div>
                  ) : null}
                  {p.website ? (
                    <div className="contact-item">
                      <span className="ic">
                        <Icon name="globe" size={15} />
                      </span>
                      <div className="txt">
                        <span className="lbl">وب‌سایت شخصی</span>
                        <a
                          className="val ltr"
                          href={toExternalUrl(p.website)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {p.website}
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
              <div className="header-chips-sep">{metaChips}</div>
            </>
          ) : null}
        </div>

        {editMode && canEdit ? (
          <div className="header-actions no-print">
            <CompletionRing profile={profile} />
          </div>
        ) : null}

        {!editMode ? (
          <div className="header-actions no-print">
            {canEdit ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={startEditProfile}
              >
                <Icon name="pencil" size={16} />
                ویرایش پروفایل
              </button>
            ) : null}
            {/* دانلود رزومه موقتاً غیرفعال شده است
            <button
              type="button"
              className="btn btn-outline cursor-not-allowed"
              onClick={() => window.print()}
              disabled
            >
              <Icon name="download" size={16} />
              دانلود رزومه
            </button>
            */}
            <button
              type="button"
              className="btn btn-outline"
              onClick={shareProfile}
              aria-label="اشتراک‌گذاری پروفایل"
            >
              <Icon name="share" size={16} />
              اشتراک‌گذاری
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
