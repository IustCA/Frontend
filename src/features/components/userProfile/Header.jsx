import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import Field from "../common/Field";
import Icon from "../common/Icon";
import { showToast } from "../../shared/AppSlice";

const IMG_AVATAR =
  "https://image.qwenlm.ai/public_source/d4ae5256-6a4f-4e2a-b022-021cf3a0d064/14cd1e56b-e87c-4b3d-8281-bcbb64951014.png";
const AVAILABILITY_OPTIONS = [
  "آماده همکاری",
  "آماده کارآموزی",
  "فقط پروژه‌های دانشجویی",
  "در حال حاضر در دسترس نیستم",
];
const firstSentence = (text) => {
  const t = String(text || "").trim();
  const idx = t.indexOf("۔");
  return idx > 0 ? t.slice(0, idx + 1) : t;
};

export default function Header({
  p,
  editMode,
  personalErrors,
  updatePersonal,
  saveProfile,
  clone,
  toastTimer,
  profile,
  backupRef,
  setPersonalErrors,
  setEditMode,
  cancelProfile,
  editing,
}) {
  const dispatch = useDispatch();
  const avatarRef = useRef(null);
  const [avatarErr, setAvatarErr] = useState("");

  const startEditProfile = () => {
    backupRef.current = clone(profile);
    setPersonalErrors({});
    setEditMode(true);
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setAvatarErr("فرمت باید JPG/PNG/WEBP باشد");
      dispatch(showToast(toastTimer, "فرمت تصویر باید JPG، PNG یا WEBP باشد.", "error"));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setAvatarErr("حجم حداکثر ۲MB");
      dispatch(showToast(toastTimer, "حجم تصویر نباید بیشتر از ۲ مگابایت باشد.", "error"));
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < 200 || img.height < 200) {
        setAvatarErr("حداقل ۲۰۰×۲۰۰");
        dispatch(showToast(toastTimer, "ابعاد تصویر خیلی کوچک است. حداقل ۲۰۰×۲۰۰ پیکسل.", "error"));
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
              src={p.avatar || IMG_AVATAR}
              alt={"تصویر پروفایل " + p.fullName}
              onError={(e) => {
                e.target.src = IMG_AVATAR;
              }}
            />
          </div>
          {editMode ? (
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
              <input ref={avatarRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleAvatar} style={{ display: "none" }} />
              <button type="button" className="btn btn-outline btn-sm" onClick={() => avatarRef.current?.click()}>
                <Icon name="user" size={13} />
                تغییر تصویر
              </button>
              {p.avatar ? (
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => updatePersonal("avatar", "")}>
                  حذف تصویر
                </button>
              ) : null}
              {avatarErr ? <span style={{ fontSize: 11, color: "var(--red)" }}>{avatarErr}</span> : null}
              <span style={{ fontSize: 10, color: "var(--muted)" }}>حداکثر ۲MB — ۲۰۰×۲۰۰ تا ۳۰۰۰×۳۰۰۰</span>
            </div>
          ) : null}
        </div>

        <div className="header-info">
          {editMode ? (
            <div className="no-print">
              <div className="grid-2">
                <Field
                  id="hd-name"
                  label="نام و نام خانوادگی"
                  required
                  error={personalErrors.fullName}
                >
                  <input
                    autoComplete="off"
                    id="hd-name"
                    className={
                      "input" + (personalErrors.fullName ? " err" : "")
                    }
                    value={p.fullName}
                    onChange={(e) => updatePersonal("fullName", e.target.value)}
                    maxLength={60}
                    placeholder="مثلاً علی رضایی"
                  />
                </Field>
                <Field
                  id="hd-title"
                  label="عنوان حرفه‌ای"
                  required
                  error={personalErrors.title}
                >
                  <input
                    autoComplete="off"
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
                <Field id="hd-uni" label="دانشگاه" error={personalErrors.university}>
                  <input
                    autoComplete="off"
                    id="hd-uni"
                    className={"input" + (personalErrors.university ? " err" : "")}
                    value={p.university}
                    onChange={(e) =>
                      updatePersonal("university", e.target.value)
                    }
                    maxLength={80}
                  />
                </Field>
                <Field id="hd-field" label="رشتهٔ تحصیلی" error={personalErrors.field}>
                  <input
                    autoComplete="off"
                    id="hd-field"
                    className={"input" + (personalErrors.field ? " err" : "")}
                    value={p.field}
                    onChange={(e) => updatePersonal("field", e.target.value)}
                    maxLength={80}
                  />
                </Field>
              </div>
              <div className="grid-2">
                <Field id="hd-sem" label="ترم تحصیلی" error={personalErrors.semester}>
                  <input
                    autoComplete="off"
                    id="hd-sem"
                    className={"input" + (personalErrors.semester ? " err" : "")}
                    value={p.semester}
                    onChange={(e) => updatePersonal("semester", e.target.value)}
                    maxLength={20}
                    placeholder="مثلاً ترم ۶"
                  />
                </Field>
                <Field id="hd-city" label="شهر محل سکونت" error={personalErrors.city}>
                  <input
                    autoComplete="off"
                    id="hd-city"
                    className={"input" + (personalErrors.city ? " err" : "")}
                    value={p.city}
                    onChange={(e) => updatePersonal("city", e.target.value)}
                    maxLength={50}
                  />
                </Field>
              </div>
              <Field id="hd-avail" label="وضعیت همکاری">
                <select
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
          ) : (
            <>
              <h1>{p.fullName}</h1>
              <p className="header-title">{p.title}</p>
            </>
          )}

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
            {p.semester ? (
              <span className="chip">
                <Icon name="star" size={14} />
                {p.semester}
              </span>
            ) : null}
            {p.city ? (
              <span className="chip">
                <Icon name="mapPin" size={14} />
                {p.city}
              </span>
            ) : null}
            {p.availability ? (
              <span className="badge-avail">
                <span className="dot" aria-hidden="true" />
                {p.availability}
              </span>
            ) : null}
          </div>

          {!editMode && p.about.trim() ? (
            <p className="header-intro">{firstSentence(p.about)}</p>
          ) : null}
        </div>

        <div className="header-actions no-print">
          {editMode ? (
            <>
              <div className="btn-wrap">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveProfile}
                  aria-disabled={!!editing}
                  aria-describedby={editing ? "save-tip-header" : undefined}
                >
                  <Icon name="check" size={16} />
                  ذخیره تغییرات
                </button>
                {editing ? (
                  <span
                    id="save-tip-header"
                    className="quick-tooltip"
                    role="tooltip"
                  >
                    ابتدا فرم باز را تکمیل یا لغو کنید
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                className="btn btn-outline"
                onClick={cancelProfile}
              >
                <Icon name="x" size={16} />
                انصراف
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-primary"
                onClick={startEditProfile}
              >
                <Icon name="pencil" size={16} />
                ویرایش پروفایل
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => window.print()}
              >
                <Icon name="download" size={16} />
                دانلود رزومه
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={shareProfile}
                aria-label="اشتراک‌گذاری پروفایل"
              >
                <Icon name="share" size={16} />
                اشتراک‌گذاری
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
