import { useState } from "react";
import Icon from "./Icon";

export default function TagInput({ id, label, value, onChange, placeholder }) {
  const [draft, setDraft] = useState("");
  const addTag = () => {
    const t = draft.trim();
    if (!t) return;
    if (!value.includes(t)) onChange([...value, t]);
    setDraft("");
  };
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div style={{ display: "flex", gap: 8 }}>
        <input autoComplete="off"
          id={id}
          className="input"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <button
          type="button"
          className="btn btn-outline btn-sm"
          style={{ minHeight: 42 }}
          onClick={addTag}
        >
          <Icon name="plus" size={15} />
          افزودن
        </button>
      </div>
      {value.length > 0 ? (
        <div className="tags" style={{ marginTop: 8 }}>
          {value.map((t, i) => (
            <span className="tag" key={t + "-" + i}>
              {t}
              <button
                type="button"
                aria-label={"حذف " + t}
                onClick={() => onChange(value.filter((v) => v !== t))}
              >
                <Icon name="x" size={13} />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
