import { useState } from "react";
import SectionCard from "../common/SectionCard";
import Field from "../common/Field";
import api from "../../api/axios";
import { useDispatch } from "react-redux";
import { showToast } from "../../shared/AppSlice";

const isStrongPassword = (value) => {
  const v = String(value || "");
  if (v.length < 8) return "رمز جدید باید حداقل ۸ کاراکتر باشد.";
  if (/\s/.test(v)) return "رمز جدید نباید فاصله داشته باشد.";
  const hasLetter = /[a-zA-Z\u0600-\u06FF]/.test(v);
  const hasDigit = /\d/.test(v);
  if (!hasLetter || !hasDigit)
    return "رمز جدید باید حداقل شامل یک حرف و یک عدد باشد.";
  if (/^(.)\1+$/.test(v)) return "رمز جدید بیش از حد ساده است.";
  return "";
};

export default function AccountSettings({ toastTimer }) {
  const dispatch = useDispatch();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);
  const [errPass, setErrPass] = useState("");

  const handlePassword = async () => {
    setErrPass("");
    if (!oldPass || !newPass || !confirmPass) {
      setErrPass("همه فیلدهای رمز عبور الزامی است.");
      return;
    }
    if (oldPass === newPass) {
      setErrPass("رمز جدید باید با رمز فعلی متفاوت باشد.");
      return;
    }
    const strengthMsg = isStrongPassword(newPass);
    if (strengthMsg) {
      setErrPass(strengthMsg);
      return;
    }
    if (newPass !== confirmPass) {
      setErrPass("تکرار رمز جدید مطابقت ندارد.");
      return;
    }
    setLoadingPass(true);
    try {
      await api.post("/api/accounts/auth/password/", {
        old_password: oldPass,
        new_password: newPass,
      });
      dispatch(showToast(toastTimer, "رمز عبور با موفقیت تغییر یافت."));
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
    } catch (e) {
      const serverData = e.response?.data;
      const msg =
        serverData?.old_password?.[0] ||
        serverData?.new_password?.[0] ||
        serverData?.detail ||
        (typeof serverData === "object"
          ? Object.values(serverData || {})
              .flat()
              .join(" ")
          : "") ||
        "خطا در تغییر رمز عبور (رمز فعلی اشتباه است یا رمز جدید معتبر نیست)";
      setErrPass(msg);
      dispatch(showToast(toastTimer, msg, "error"));
    } finally {
      setLoadingPass(false);
    }
  };

  return (
    <SectionCard icon="user" title="حساب کاربری" titleId="account-title">
      <h4 style={{ fontSize: 13, fontWeight: 800, marginBottom: 8 }}>
        تغییر رمز عبور
      </h4>
      <form
        autoComplete="off"
        data-lpignore="true"
        onSubmit={(e) => {
          e.preventDefault();
          handlePassword();
        }}
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
          id="acc-old"
          label="رمز فعلی"
          error={errPass && !oldPass ? errPass : ""}
        >
          <input
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-1p-ignore="true"
            data-bwignore="true"
            data-form-type="other"
            name="acc-old_no_autofill"
            id="acc-old"
            type="password"
            className="input"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            placeholder="رمز فعلی"
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
        <Field id="acc-new" label="رمز جدید">
          <input
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-1p-ignore="true"
            data-bwignore="true"
            data-form-type="other"
            name="acc-new_no_autofill"
            id="acc-new"
            type="password"
            className="input"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="حداقل ۸ کاراکتر شامل حرف و عدد"
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
        <Field id="acc-confirm" label="تکرار رمز جدید" error={errPass}>
          <input
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-1p-ignore="true"
            data-bwignore="true"
            data-form-type="other"
            name="acc-confirm_no_autofill"
            id="acc-confirm"
            type="password"
            className={`input${errPass ? " err" : ""}`}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="تکرار رمز جدید"
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
        <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>
          رمز جدید باید حداقل ۸ کاراکتر و شامل حرف و عدد باشد و با رمز فعلی فرق
          کند.
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          onClick={handlePassword}
          disabled={loadingPass}
        >
          {loadingPass ? "..." : "تغییر رمز عبور"}
        </button>
      </form>
    </SectionCard>
  );
}
