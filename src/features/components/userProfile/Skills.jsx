import AddButton from "../common/AddButton";
import EmptyState from "../common/EmptyState";
import SectionCard from "../common/SectionCard";
import SkillForm from "./SkillForm";
import EditableItem from "../common/EditableItem";

const LEVEL_PCT = {
  مقدماتی: "30%",
  متوسط: "55%",
  پیشرفته: "80%",
  حرفه‌ای: "100%",
};
const SKILL_CATEGORIES = [
  "مهارت‌های فنی",
  "زبان‌های برنامه‌نویسی",
  "ابزارها و نرم‌افزارها",
  "مهارت‌های نرم",
];

export default function Skills({
  profile,
  isFormOpen,
  editMode,
  startEdit,
  saveItem,
  cancelItem,
  removeItem,
}) {
  return (
    <SectionCard icon="sparkles" title="مهارت‌ها" titleId="skills-title">
      {profile.skills.length === 0 && !isFormOpen("skills", "new") ? (
        <EmptyState
          text="هنوز مهارتی اضافه نشده است۔"
          onAdd={editMode ? () => startEdit("skills", "new") : null}
          addLabel="افزودن مهارت"
        />
      ) : (
        <>
          {SKILL_CATEGORIES.map((cat) => {
            const items = profile.skills.filter((s) => s.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <h3 className="sub-title">{cat}</h3>
                <div className="stack" style={{ gap: 4 }}>
                  {items.map((s) =>
                    isFormOpen("skills", s.id) ? (
                      <SkillForm
                        key={s.id}
                        initial={s}
                        onSave={(d) => saveItem("skills", s.id, d)}
                        onCancel={() => cancelItem("skills")}
                        SKILL_CATEGORIES={SKILL_CATEGORIES}
                      />
                    ) : (
                      <EditableItem
                        key={s.id}
                        editMode={editMode}
                        onEdit={() => startEdit("skills", s.id)}
                        onDelete={() => removeItem("skills", s.id)}
                      >
                        <div className="skill-row">
                          <div className="skill-top">
                            <span>{s.name}</span>
                            <span className="skill-level">{s.level}</span>
                          </div>
                          <div
                            className="progress"
                            role="img"
                            aria-label={"سطح " + s.name + ": " + s.level}
                          >
                            <span
                              style={{
                                width: LEVEL_PCT[s.level] || "50%",
                              }}
                            />
                          </div>
                        </div>
                      </EditableItem>
                    ),
                  )}
                </div>
              </div>
            );
          })}
          {isFormOpen("skills", "new") ? (
            <SkillForm
              onSave={(d) => saveItem("skills", "new", d)}
              onCancel={() => cancelItem("skills")}
              SKILL_CATEGORIES={SKILL_CATEGORIES}
            />
          ) : null}
          {editMode && !isFormOpen("skills", "new") ? (
            <AddButton
              onClick={() => startEdit("skills", "new")}
              label="افزودن مهارت"
            />
          ) : null}
        </>
      )}
    </SectionCard>
  );
}
