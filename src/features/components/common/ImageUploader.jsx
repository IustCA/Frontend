import { useRef, useState } from "react";

const DEFAULT_PROJECT_PLACEHOLDER = "https://via.placeholder.com/600x400?text=No+Image";
const DEFAULT_AVATAR_PLACEHOLDER = "https://via.placeholder.com/300?text=Avatar";

function validateFile(file, maxSizeMB = 2) {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowed.includes(file.type)) {
    return "فرمت تصویر باید JPG، PNG یا WEBP باشد.";
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `حجم تصویر نباید بیشتر از ${maxSizeMB} مگابایت باشد.`;
  }
  return null;
}

export default function ImageUploader({
  id,
  label,
  value,
  onChange,
  placeholder = DEFAULT_PROJECT_PLACEHOLDER,
  maxSizeMB = 2,
  minWidth = 200,
  minHeight = 200,
  maxWidth = 3000,
  maxHeight = 3000,
  error,
  required,
}) {
  const inputRef = useRef(null);
  const [localError, setLocalError] = useState("");

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const typeErr = validateFile(file, maxSizeMB);
    if (typeErr) {
      setLocalError(typeErr);
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < minWidth || img.height < minHeight) {
        setLocalError(`ابعاد تصویر خیلی کوچک است. حداقل ${minWidth}×${minHeight} پیکسل.`);
        URL.revokeObjectURL(url);
        return;
      }
      if (img.width > maxWidth || img.height > maxHeight) {
        setLocalError(`ابعاد تصویر خیلی بزرگ است. حداکثر ${maxWidth}×${maxHeight} پیکسل.`);
        URL.revokeObjectURL(url);
        return;
      }
      setLocalError("");
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result); // base64 data URL
      };
      reader.readAsDataURL(file);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      setLocalError("فایل تصویر معتبر نیست.");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const clear = () => {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
    setLocalError("");
  };

  const displaySrc = value || placeholder;
  const errMsg = localError || error;

  return (
    <div className="field">
      {label ? (
        <label htmlFor={id} style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#3d4664", marginBottom: 5 }}>
          {label} {required ? <span style={{ color: "var(--red)" }}>*</span> : null}
        </label>
      ) : null}
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #e7eaf4",
            background: "#f2f4fb",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <img
            src={displaySrc}
            alt="preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => (e.target.src = placeholder)}
          />
        </div>
        <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
          <input
            id={id}
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFile}
            style={{ display: "none" }}
          />
          <button type="button" className="btn btn-outline btn-sm" onClick={() => inputRef.current?.click()}>
            انتخاب تصویر
          </button>
          {value ? (
            <button type="button" className="btn btn-ghost btn-sm" onClick={clear}>
              حذف تصویر
            </button>
          ) : null}
          <span style={{ fontSize: 11, color: "var(--muted)" }}>
            حداکثر {maxSizeMB}MB — {minWidth}×{minHeight} تا {maxWidth}×{maxHeight}
          </span>
        </div>
      </div>
      {errMsg ? <span className="err-msg">{errMsg}</span> : null}
    </div>
  );
}

export { DEFAULT_PROJECT_PLACEHOLDER, DEFAULT_AVATAR_PLACEHOLDER };
