export const toExternalUrl = (value) => {
  const v = String(value || "").trim();
  if (!v) return "";
  if (/^(https?:)?\/\//i.test(v)) return v;
  if (/^[a-z][a-z0-9+.-]*:/i.test(v)) return v;
  return "https://" + v;
};
