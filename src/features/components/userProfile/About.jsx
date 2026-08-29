import SectionCard from "../common/SectionCard";
import Field from "../common/Field";

export default function About({ editMode, p, updatePersonal, personalErrors }) {
  return (
    <SectionCard icon="user" title="درباره من" titleId="about-title">
      {editMode ? (
        <div className="no-print">
          <Field
            id="about-input"
            label="متن معرفی"
            required
            error={personalErrors?.about}
          >
            <textarea
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-lpignore="true"
              data-form-type="other"
              autoComplete="off"
              name="about-input_no_autofill"
              id="about-input"
              className={"input" + (personalErrors?.about ? " err" : "")}
              style={{ minHeight: 130 }}
              value={p.about}
              onChange={(e) => updatePersonal("about", e.target.value)}
              maxLength={1000}
              placeholder="حداکثر ۱۰۰۰ کاراکتر"
            />
            <div
              style={{ fontSize: 11, color: "var(--muted)", textAlign: "left" }}
            >
              {p.about.length}/۱۰۰۰
            </div>
          </Field>
        </div>
      ) : (
        <p style={{ color: "var(--muted)", fontSize: 14 }}>{p.about}</p>
      )}
    </SectionCard>
  );
}
