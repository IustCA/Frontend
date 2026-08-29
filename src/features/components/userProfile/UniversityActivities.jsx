import EmptyState from "../common/EmptyState";
import SectionCard from "../common/SectionCard";
import EditableItem from "../common/EditableItem";
import Icon from "../common/Icon";
import AddButton from "../common/AddButton";
import ActivityForm from "./ActivityForm";

export default function UniversityActivities({
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
      icon="users"
      title="فعالیت‌ها و تجربه‌های دانشگاهی"
      titleId="activities-title"
    >
      {profile.activities.length === 0 && !isFormOpen("activities", "new") ? (
        <EmptyState
          text="هنوز فعالیتی به این بخش اضافه نشده است۔"
          onAdd={editMode ? () => startEdit("activities", "new") : null}
          addLabel="افزودن فعالیت"
        />
      ) : (
        <>
          <div className="stack">
            {profile.activities.map((ac) =>
              isFormOpen("activities", ac.id) ? (
                <ActivityForm
                  key={ac.id}
                  initial={ac}
                  onSave={(d) => saveItem("activities", ac.id, d)}
                  onCancel={() => setEditing(null)}
                />
              ) : (
                <EditableItem
                  key={ac.id}
                  editMode={editMode}
                  onEdit={() => startEdit("activities", ac.id)}
                  onDelete={() => removeItem("activities", ac.id)}
                >
                  <h3 style={{ fontSize: 14.5, fontWeight: 800 }}>
                    {ac.title}
                  </h3>
                  <p className="tl-sub">
                    {ac.role ? ac.role + " — " : ""}
                    {ac.organization}
                  </p>
                  {ac.date ? (
                    <div className="meta">
                      <span>
                        <Icon name="clock" size={13} />
                        {ac.date}
                      </span>
                    </div>
                  ) : null}
                  {ac.description ? (
                    <p className="tl-desc">{ac.description}</p>
                  ) : null}
                  {ac.achievements ? (
                    <p
                      className="tl-desc"
                      style={{
                        color: "var(--green)",
                        display: "flex",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <Icon name="award" size={13} />
                      {ac.achievements}
                    </p>
                  ) : null}
                </EditableItem>
              ),
            )}
          </div>
          {isFormOpen("activities", "new") ? (
            <ActivityForm
              onSave={(d) => saveItem("activities", "new", d)}
              onCancel={() => setEditing(null)}
            />
          ) : null}
          {editMode && !isFormOpen("activities", "new") ? (
            <AddButton
              onClick={() => startEdit("activities", "new")}
              label="افزودن فعالیت"
            />
          ) : null}
        </>
      )}
    </SectionCard>
  );
}
