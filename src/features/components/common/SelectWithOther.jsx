import { useState } from "react";
import Field from "./Field";

const OTHER_VALUE = "__other__";

export default function SelectWithOther({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "مقدار سفارشی را وارد کنید",
  error,
  otherLabel = "سایر",
}) {
  const [isOther, setIsOther] = useState(() => !options.includes(value));

  const handleSelect = (e) => {
    const next = e.target.value;
    if (next === OTHER_VALUE) {
      setIsOther(true);
      onChange("");
    } else {
      setIsOther(false);
      onChange(next);
    }
  };

  return (
    <div>
      <Field
        id={id}
        label={label}
        error={isOther ? undefined : error}
        required
      >
        <select
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          autoComplete="off"
          id={id}
          className={"input" + (!isOther && error ? " err" : "")}
          value={isOther ? OTHER_VALUE : value}
          onChange={handleSelect}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          <option value={OTHER_VALUE}>{otherLabel}</option>
        </select>
      </Field>

      {isOther ? (
        <Field id={`${id}-other`} label={otherLabel} error={error} required>
          <input
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-lpignore="true"
            data-form-type="other"
            autoComplete="off"
            name={`${id}-other_no_autofill`}
            id={`${id}-other`}
            className={"input" + (error ? " err" : "")}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={100}
          />
        </Field>
      ) : null}
    </div>
  );
}
