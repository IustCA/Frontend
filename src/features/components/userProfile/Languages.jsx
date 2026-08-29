import EmptyState from "../common/EmptyState";
import SectionCard from "../common/SectionCard";
import LanguageForm from "./LanguageForm";
import EditableItem from "../common/EditableItem";
import AddButton from "../common/AddButton";

export default function Languages({
  profile,
  isFormOpen,
  editMode,
  startEdit,
  saveItem,
  setEditing,
  removeItem,
}) {
  return (
    <SectionCard icon="languages" title="زبان‌ها" titleId="languages-title">
      {profile.languages.length === 0 && !isFormOpen("languages", "new") ? (
        <EmptyState
          text="هنوز زبانی اضافه نشده است۔"
          onAdd={editMode ? () => startEdit("languages", "new") : null}
          addLabel="افزودن زبان"
        />
      ) : (
        <div className="stack" style={{ gap: 8 }}>
          {profile.languages.map((lg) =>
            isFormOpen("languages", lg.id) ? (
              <LanguageForm
                key={lg.id}
                initial={lg}
                onSave={(d) => saveItem("languages", lg.id, d)}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <EditableItem
                key={lg.id}
                editMode={editMode}
                onEdit={() => startEdit("languages", lg.id)}
                onDelete={() => removeItem("languages", lg.id)}
              >
                <div className="skill-row" style={{ padding: "2px 0" }}>
                  <div className="skill-top">
                    <span>{lg.name}</span>
                    <span className="skill-level">{lg.level}</span>
                  </div>
                </div>
              </EditableItem>
            ),
          )}
          {isFormOpen("languages", "new") ? (
            <LanguageForm
              onSave={(d) => saveItem("languages", "new", d)}
              onCancel={() => setEditing(null)}
            />
          ) : null}
          {editMode && !isFormOpen("languages", "new") ? (
            <AddButton
              onClick={() => startEdit("languages", "new")}
              label="افزودن زبان"
            />
          ) : null}
        </div>
      )}
    </SectionCard>
  );
}
