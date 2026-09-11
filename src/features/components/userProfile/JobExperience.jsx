import EmptyState from "../common/EmptyState";
import SectionCard from "../common/SectionCard";
import EditableItem from "../common/EditableItem";
import Icon from "../common/Icon";
import AddButton from "../common/AddButton";
import ExperienceForm from "./ExperienceForm";

export default function JobExperience({
  profile,
  isFormOpen,
  editMode,
  startEdit,
  saveItem,
  cancelItem,
  removeItem,
  dateRange,
}) {
  return (
    <SectionCard icon="briefcase" title="سوابق کاری" titleId="experience-title">
      {profile.experiences.length === 0 && !isFormOpen("experiences", "new") ? (
        <EmptyState
          text="هنوز تجربه‌ای به این بخش اضافه نشده است۔"
          onAdd={editMode ? () => startEdit("experiences", "new") : null}
          addLabel="افزودن سابقهٔ کاری"
        />
      ) : (
        <>
          <div className="timeline">
            {profile.experiences.map((ex) =>
              isFormOpen("experiences", ex.id) ? (
                <div className="tl-item" key={ex.id}>
                  <ExperienceForm
                    initial={ex}
                    onSave={(d) => saveItem("experiences", ex.id, d)}
                    onCancel={() => cancelItem("experiences")}
                  />
                </div>
              ) : (
                <div className="tl-item" key={ex.id}>
                  <EditableItem
                    editMode={editMode}
                    onEdit={() => startEdit("experiences", ex.id)}
                    onDelete={() => removeItem("experiences", ex.id)}
                  >
                    <h3>{ex.jobTitle}</h3>
                    <p className="tl-sub">{ex.company}</p>
                    <div className="meta">
                      <span>
                        <Icon name="briefcase" size={13} />
                        {ex.type}
                      </span>
                      <span>
                        <Icon name="calendar" size={13} />
                        {dateRange(ex.startDate, ex.endDate, ex.ongoing)}
                      </span>
                      {ex.location ? (
                        <span>
                          <Icon name="mapPin" size={13} />
                          {ex.location}
                        </span>
                      ) : null}
                    </div>
                    {ex.description ? (
                      <p className="tl-desc">{ex.description}</p>
                    ) : null}
                    {ex.responsibilities && ex.responsibilities.length > 0 ? (
                      <ul className="bullet">
                        {ex.responsibilities.map((r, i) => (
                          <li key={r + "-" + i}>{r}</li>
                        ))}
                      </ul>
                    ) : null}
                    {ex.skillsUsed && ex.skillsUsed.length > 0 ? (
                      <div className="tags" style={{ marginTop: 10 }}>
                        {ex.skillsUsed.map((s, i) => (
                          <span className="tag" key={s + "-" + i}>
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </EditableItem>
                </div>
              ),
            )}
          </div>
          {isFormOpen("experiences", "new") ? (
            <ExperienceForm
              onSave={(d) => saveItem("experiences", "new", d)}
              onCancel={() => cancelItem("experiences")}
            />
          ) : null}
          {editMode && !isFormOpen("experiences", "new") ? (
            <AddButton
              onClick={() => startEdit("experiences", "new")}
              label="افزودن سابقهٔ کاری"
            />
          ) : null}
        </>
      )}
    </SectionCard>
  );
}
