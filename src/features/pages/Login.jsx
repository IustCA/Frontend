import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useQueryClient } from "react-query";
import Field from "../components/common/Field.jsx";
import Icon from "../components/common/Icon.jsx";
import api, { setAuthTokens } from "../api/axios.js";
import { showToast } from "../shared/AppSlice.js";

const makeCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

const toEnglishDigits = (value = "") =>
  value
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

export default function Login({ toastTimer }) {
  const [studentId, setStudentId] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState(() => makeCaptcha());
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const refreshCaptcha = () => {
    setCaptchaCode(makeCaptcha());
    setCaptchaInput("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const sid = toEnglishDigits(studentId).trim();
    const nid = toEnglishDigits(nationalId).trim();

    const next = {};
    if (!sid) next.studentId = "شماره دانشجویی را وارد کنید.";
    else if (!/^\d+$/.test(sid))
      next.studentId = "شماره دانشجویی باید فقط شامل عدد باشد.";
    else if (sid.length > 11)
      next.studentId = "شماره دانشجویی نمی‌تواند بیش از ۱۱ رقم باشد.";
    if (!nid) next.nationalId = "کد ملی را وارد کنید.";
    if (!captchaInput.trim()) next.captcha = "کد امنیتی را وارد کنید.";
    else if (captchaInput.trim().toUpperCase() !== captchaCode)
      next.captcha = "کد امنیتی نادرست است.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      if (next.captcha && captchaInput.trim()) refreshCaptcha();
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await api.post("/api/accounts/auth/login/", {
        username: sid,
        password: nid,
      });
      setAuthTokens({ access: data?.access, refresh: data?.refresh });
      queryClient.removeQueries("fetch_user_info");
      dispatch(showToast(toastTimer, "ورود با موفقیت انجام شد.", "ok"));
      navigate("/profile", { replace: true });
    } catch (error) {
      const detail =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.username?.[0] ||
        error.response?.data?.password?.[0] ||
        (error.message?.includes("Network Error")
          ? "خطا در اتصال به سرور"
          : "خطا در ورود. لطفا دوباره تلاش کنید.");
      setServerError(detail);
      dispatch(showToast(toastTimer, detail, "error"));
      refreshCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card card">
        <div className="login-head">
          <div className="login-logo">
            <Icon name="gradCap" size={26} />
          </div>
          <h1>ورود به IustCA</h1>
          <p>برای ادامه، شماره دانشجویی و کد ملی خود را وارد کنید.</p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore="true"
          data-bwignore="true"
          data-form-type="other"
        >
          <input
            type="text"
            name="fake-username-trap"
            autoComplete="username"
            tabIndex={-1}
            aria-hidden="true"
            readOnly
            value=""
            onChange={() => {}}
            style={{ display: "none" }}
          />
          <input
            type="password"
            name="fake-password-trap"
            autoComplete="new-password"
            tabIndex={-1}
            aria-hidden="true"
            readOnly
            value=""
            onChange={() => {}}
            style={{ display: "none" }}
          />
          <Field
            id="studentId"
            label="شماره دانشجویی"
            required
            error={errors.studentId}
          >
            <div className="input-with-icon">
              <span className="input-icon">
                <Icon name="badge" size={17} />
              </span>
              <input
                id="studentId"
                name="studentId_no_autofill"
                className={`input has-icon ltr ${errors.studentId ? "err" : ""}`}
                type="text"
                inputMode="numeric"
                placeholder="مثلاً 400123456"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                data-lpignore="true"
                data-1p-ignore="true"
                data-bwignore="true"
                data-form-type="other"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                readOnly
                onFocus={(e) => {
                  e.currentTarget.removeAttribute("readonly");
                  e.currentTarget.readOnly = false;
                }}
                onClick={(e) => {
                  e.currentTarget.removeAttribute("readonly");
                  e.currentTarget.readOnly = false;
                }}
              />
            </div>
          </Field>

          <Field
            id="nationalId"
            label="رمز عبور(کدملی)"
            required
            error={errors.nationalId}
          >
            <div className="input-with-icon">
              <span className="input-icon">
                <Icon name="user" size={17} />
              </span>
              <input
                id="nationalId"
                name="nationalId_no_autofill"
                className={`input has-icon ltr ${errors.nationalId ? "err" : ""}`}
                type="text"
                inputMode="numeric"
                placeholder="مثلاً 0012345678"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                data-lpignore="true"
                data-1p-ignore="true"
                data-bwignore="true"
                data-form-type="other"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                readOnly
                onFocus={(e) => {
                  e.currentTarget.removeAttribute("readonly");
                  e.currentTarget.readOnly = false;
                }}
                onClick={(e) => {
                  e.currentTarget.removeAttribute("readonly");
                  e.currentTarget.readOnly = false;
                }}
              />
            </div>
          </Field>

          <Field id="captcha" label="کد امنیتی" required error={errors.captcha}>
            <div className="captcha-row">
              <div className="captcha-box ltr" aria-hidden="true">
                {captchaCode.split("").map((ch, i) => (
                  <span
                    key={i}
                    style={{
                      transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (6 + i * 2)}deg) translateY(${i % 2 === 0 ? -2 : 2}px)`,
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={refreshCaptcha}
                title="تولید کد جدید"
                aria-label="تولید کد جدید"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                  <path d="M21 3v6h-6" />
                </svg>
              </button>
            </div>
            <input
              id="captcha"
              name="captcha_no_autofill"
              className={`input ltr captcha-input ${errors.captcha ? "err" : ""}`}
              type="text"
              inputMode="text"
              placeholder="کد داخل تصویر را وارد کنید"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-lpignore="true"
              data-1p-ignore="true"
              data-bwignore="true"
              data-form-type="other"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              readOnly
              onFocus={(e) => {
                e.currentTarget.removeAttribute("readonly");
                e.currentTarget.readOnly = false;
              }}
              onClick={(e) => {
                e.currentTarget.removeAttribute("readonly");
                e.currentTarget.readOnly = false;
              }}
            />
          </Field>

          {serverError && (
            <p className="err-msg" role="alert">
              <Icon name="alert" size={13} />
              {serverError}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary login-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}
