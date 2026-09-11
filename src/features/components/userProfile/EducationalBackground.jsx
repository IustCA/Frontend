import AddButton from "../common/AddButton";
import EmptyState from "../common/EmptyState";
import SectionCard from "../common/SectionCard";
import EducationForm from "./EducationForm";
import EditableItem from "../common/EditableItem";
import Icon from "../common/Icon";

export default function EducationalBackground({
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
    <SectionCard icon="gradCap" title="سوابق تحصیلی" titleId="education-title">
      {profile.education.length === 0 && !isFormOpen("education", "new") ? (
        <EmptyState
          text="هنوز سابقهٔ تحصیلی اضافه نشده است۔"
          onAdd={editMode ? () => startEdit("education", "new") : null}
          addLabel="افزودن سابقهٔ تحصیلی"
        />
      ) : (
        <>
          <div className="timeline">
            {profile.education.map((ed) =>
              isFormOpen("education", ed.id) ? (
                <div className="tl-item" key={ed.id}>
                  <EducationForm
                    initial={ed}
                    onSave={(d) => saveItem("education", ed.id, d)}
                    onCancel={() => cancelItem("education")}
                  />
                </div>
              ) : (
                <div className="tl-item" key={ed.id}>
                  <EditableItem
                    editMode={editMode}
                    onEdit={() => startEdit("education", ed.id)}
                    onDelete={() => removeItem("education", ed.id)}
                  >
                    <h3>
                      {ed.degree} {ed.field}
                    </h3>
                    <p className="tl-sub">{ed.university}</p>
                    <div className="meta">
                      <span>
                        <Icon name="calendar" size={13} />
                        {dateRange(ed.startDate, ed.endDate, ed.ongoing)}
                      </span>
                      {ed.gpa ? (
                        <span>
                          <Icon name="star" size={13} />
                          معدل: {ed.gpa}
                        </span>
                      ) : null}
                    </div>
                    {ed.description ? (
                      <p className="tl-desc">{ed.description}</p>
                    ) : null}
                    {ed.courses && ed.courses.length > 0 ? (
                      <div className="tags" style={{ marginTop: 10 }}>
                        {ed.courses.map((c, i) => (
                          <span className="tag" key={c + "-" + i}>
                            {c}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </EditableItem>
                </div>
              ),
            )}
          </div>
          {isFormOpen("education", "new") ? (
            <EducationForm
              onSave={(d) => saveItem("education", "new", d)}
              onCancel={() => cancelItem("education")}
            />
          ) : null}
          {editMode && !isFormOpen("education", "new") ? (
            <AddButton
              onClick={() => startEdit("education", "new")}
              label="افزودن سابقهٔ تحصیلی"
            />
          ) : null}
        </>
      )}
    </SectionCard>
  );
}
