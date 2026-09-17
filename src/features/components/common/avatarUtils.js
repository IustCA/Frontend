export const DEFAULT_AVATARS = {
  male: "/avatar-male.svg",
  female: "/avatar-female.svg",
};

const FEMALE_GENDER_VALUES = [
  "female",
  "f",
  "woman",
  "زن",
  "خانم",
  "دختر",
  "مونث",
  "مؤنث",
];

export const getDefaultAvatar = (gender) => {
  const value = String(gender ?? "")
    .trim()
    .toLowerCase();
  return FEMALE_GENDER_VALUES.includes(value)
    ? DEFAULT_AVATARS.female
    : DEFAULT_AVATARS.male;
};
