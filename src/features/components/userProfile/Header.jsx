import { useDispatch } from "react-redux";
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
}) {
  const dispatch = useDispatch();

  const startEditProfile = () => {
    backupRef.current = clone(profile);
    setPersonalErrors({});
    setEditMode(true);
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
              src={IMG_AVATAR}
              alt={"تصویر پروفایل " + p.fullName}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
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
                    id="hd-name"
                    className={
                      "input" + (personalErrors.fullName ? " err" : "")
                    }
                    value={p.fullName}
                    onChange={(e) => updatePersonal("fullName", e.target.value)}
                  />
                </Field>
                <Field
                  id="hd-title"
                  label="عنوان حرفه‌ای"
                  required
                  error={personalErrors.title}
                >
                  <input
                    id="hd-title"
                    className={"input" + (personalErrors.title ? " err" : "")}
                    value={p.title}
                    onChange={(e) => updatePersonal("title", e.target.value)}
                  />
                </Field>
              </div>
              <div className="grid-2">
                <Field id="hd-uni" label="دانشگاه">
                  <input
                    id="hd-uni"
                    className="input"
                    value={p.university}
                    onChange={(e) =>
                      updatePersonal("university", e.target.value)
                    }
                  />
                </Field>
                <Field id="hd-field" label="رشتهٔ تحصیلی">
                  <input
                    id="hd-field"
                    className="input"
                    value={p.field}
                    onChange={(e) => updatePersonal("field", e.target.value)}
                  />
                </Field>
              </div>
              <div className="grid-2">
                <Field id="hd-sem" label="ترم تحصیلی">
                  <input
                    id="hd-sem"
                    className="input"
                    value={p.semester}
                    onChange={(e) => updatePersonal("semester", e.target.value)}
                  />
                </Field>
                <Field id="hd-city" label="شهر محل سکونت">
                  <input
                    id="hd-city"
                    className="input"
                    value={p.city}
                    onChange={(e) => updatePersonal("city", e.target.value)}
                  />
                </Field>
              </div>
              <Field id="hd-avail" label="وضعیت همکاری">
                <select
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveProfile}
              >
                <Icon name="check" size={16} />
                ذخیره تغییرات
              </button>
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
