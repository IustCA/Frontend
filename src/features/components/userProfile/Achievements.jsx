import SectionCard from "../common/SectionCard";
import EditableItem from "../common/EditableItem";
import EmptyState from "../common/EmptyState";
import Icon from "../common/Icon";
import AddButton from "../common/AddButton";
import AchievementForm from "./AchievementForm";

export default function Achievements({
  profile,
  isFormOpen,
  editMode,
  startEdit,
  saveItem,
  setEditing,
  removeItem,
}) {
  return (
    <SectionCard
      icon="medal"
      title="افتخارات و دستاوردها"
      titleId="achievements-title"
    >
      {profile.achievements.length === 0 &&
      !isFormOpen("achievements", "new") ? (
        <EmptyState
          text="هنوز دستاوردی ثبت نشده است۔"
          onAdd={editMode ? () => startEdit("achievements", "new") : null}
          addLabel="افزودن دستاورد"
        />
      ) : (
        <>
          <div className="stack">
            {profile.achievements.map((ah) =>
              isFormOpen("achievements", ah.id) ? (
                <AchievementForm
                  key={ah.id}
                  initial={ah}
                  onSave={(d) => saveItem("achievements", ah.id, d)}
                  onCancel={() => setEditing(null)}
                />
              ) : (
                <EditableItem
                  key={ah.id}
                  editMode={editMode}
                  onEdit={() => startEdit("achievements", ah.id)}
                  onDelete={() => removeItem("achievements", ah.id)}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      className="section-icon"
                      style={{
                        width: 34,
                        height: 34,
                        background: "var(--green-soft)",
                        color: "var(--green)",
                      }}
                    >
                      <Icon name="medal" size={16} />
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ fontSize: 14.5, fontWeight: 800 }}>
                        {ah.title}
                      </h3>
                      <div className="meta">
                        <span
                          className="tag tag-cat"
                          style={{ padding: "1px 10px" }}
                        >
                          {ah.type}
                        </span>
                        {ah.date ? (
                          <span>
                            <Icon name="calendar" size={13} />
                            {ah.date}
                          </span>
                        ) : null}
                      </div>
                      {ah.description ? (
                        <p className="tl-desc">{ah.description}</p>
                      ) : null}
                    </div>
                  </div>
                </EditableItem>
              ),
            )}
          </div>
          {isFormOpen("achievements", "new") ? (
            <AchievementForm
              onSave={(d) => saveItem("achievements", "new", d)}
              onCancel={() => setEditing(null)}
            />
          ) : null}
          {editMode && !isFormOpen("achievements", "new") ? (
            <AddButton
              onClick={() => startEdit("achievements", "new")}
              label="افزودن دستاورد"
            />
          ) : null}
        </>
      )}
    </SectionCard>
  );
}
