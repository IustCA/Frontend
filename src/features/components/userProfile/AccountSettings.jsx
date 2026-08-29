import { useEffect, useState } from "react";
import SectionCard from "../common/SectionCard";
import Field from "../common/Field";
import api from "../../api/axios";
import { useDispatch } from "react-redux";
import { showToast } from "../../shared/AppSlice";

export default function AccountSettings({ p, toastTimer, onUsernameChanged }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(p.username || "");

  useEffect(() => {
    setUsername(p.username || "");
  }, [p.username]);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [errUser, setErrUser] = useState("");
  const [errPass, setErrPass] = useState("");

  const handleUsername = async () => {
    setErrUser("");
    const u = username.trim();
    if (!u) { setErrUser("نام کاربری الزامی است."); return; }
    if (u.length < 3 || u.length > 30) { setErrUser("نام کاربری باید بین ۳ تا ۳۰ کاراکتر باشد."); return; }
    if (!/^[a-zA-Z0-9_.]+$/.test(u)) { setErrUser("فقط حروف انگلیسی، عدد، _ و . مجاز است."); return; }
    if (u === p.username) { dispatch(showToast(toastTimer, "نام کاربری تغییری نکرده است.", "error")); return; }
    setLoadingUser(true);
    try {
      const res = await api.patch("/api/accounts/auth/username/", { username: u });
      const newUsername = res.data?.username || res.data?.user?.username || u;
      dispatch(showToast(toastTimer, "نام کاربری با موفقیت تغییر یافت."));
      if (onUsernameChanged) {
        onUsernameChanged(newUsername);
      } else {
        setUsername(newUsername);
      }
    } catch (e) {
      const msg = e.response?.data?.detail || "خطا در تغییر نام کاربری";
      setErrUser(msg);
      dispatch(showToast(toastTimer, msg, "error"));
    } finally { setLoadingUser(false); }
  };

  const handlePassword = async () => {
    setErrPass("");
    if (!oldPass || !newPass || !confirmPass) { setErrPass("همه فیلدهای رمز عبور الزامی است."); return; }
    if (newPass.length < 6) { setErrPass("رمز جدید حداقل ۶ کاراکتر."); return; }
    if (newPass !== confirmPass) { setErrPass("تکرار رمز جدید مطابقت ندارد."); return; }
    if (oldPass === newPass) { setErrPass("رمز جدید باید متفاوت باشد."); return; }
    setLoadingPass(true);
    try {
      await api.post("/api/accounts/auth/password/", { old_password: oldPass, new_password: newPass });
      dispatch(showToast(toastTimer, "رمز عبور با موفقیت تغییر یافت."));
      setOldPass(""); setNewPass(""); setConfirmPass("");
    } catch (e) {
      const msg = e.response?.data?.detail || "خطا در تغییر رمز عبور";
      setErrPass(msg);
      dispatch(showToast(toastTimer, msg, "error"));
    } finally { setLoadingPass(false); }
  };

  return (
    <SectionCard icon="user" title="حساب کاربری" titleId="account-title">
      <Field id="acc-username" label="نام کاربری" error={errUser}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-form-type="other"
            name="acc-username_no_autofill" id="acc-username"
            className={`input ltr${errUser ? " err" : ""}`}
            value={username}
            onChange={(e) => {
              const filtered = e.target.value.replace(/[^a-zA-Z0-9_.]/g, "").slice(0, 30);
              setUsername(filtered);
            }}
            placeholder="username"
            maxLength={30}
            inputMode="text"
            dir="ltr"
          />
          <button type="button" className="btn btn-primary btn-sm" onClick={handleUsername} disabled={loadingUser}>
            {loadingUser ? "..." : "ذخیره"}
          </button>
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>۳ تا ۳۰ کاراکتر، فقط حروف/عدد/ _ و .</div>
      </Field>
      <div style={{ height: 1, background: "#e7eaf4", margin: "16px 0" }} />
      <h4 style={{ fontSize: 13, fontWeight: 800, marginBottom: 8 }}>تغییر رمز عبور</h4>
      <Field id="acc-old" label="رمز فعلی" error={errPass && !oldPass ? errPass : ""}>
        <input autoComplete="new-password" autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" name="acc-old_no_autofill" id="acc-old" type="password" className="input" value={oldPass} onChange={(e) => setOldPass(e.target.value)} placeholder="رمز فعلی" />
      </Field>
      <Field id="acc-new" label="رمز جدید">
        <input autoComplete="new-password" autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" name="acc-new_no_autofill" id="acc-new" type="password" className="input" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="حداقل ۶ کاراکتر" />
      </Field>
      <Field id="acc-confirm" label="تکرار رمز جدید" error={errPass}>
        <input autoComplete="new-password" autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-form-type="other" name="acc-confirm_no_autofill" id="acc-confirm" type="password" className={`input${errPass ? " err" : ""}`} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="تکرار رمز جدید" />
      </Field>
      <button type="button" className="btn btn-primary btn-sm" onClick={handlePassword} disabled={loadingPass}>
        {loadingPass ? "..." : "تغییر رمز عبور"}
      </button>
    </SectionCard>
  );
}
