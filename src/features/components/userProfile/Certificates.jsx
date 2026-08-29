import EmptyState from "../common/EmptyState";
import SectionCard from "../common/SectionCard";
import EditableItem from "../common/EditableItem";
import Icon from "../common/Icon";
import AddButton from "../common/AddButton";
import CertificateForm from "./CertificateForm";

export default function Certificates({
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
      icon="book"
      title="دوره‌ها و گواهینامه‌ها"
      titleId="certificates-title"
    >
      {profile.certificates.length === 0 &&
      !isFormOpen("certificates", "new") ? (
        <EmptyState
          text="هنوز گواهینامه‌ای ثبت نشده است۔"
          onAdd={editMode ? () => startEdit("certificates", "new") : null}
          addLabel="افزودن گواهینامه"
        />
      ) : (
        <>
          <div className="stack">
            {profile.certificates.map((ce) =>
              isFormOpen("certificates", ce.id) ? (
                <CertificateForm
                  key={ce.id}
                  initial={ce}
                  onSave={(d) => saveItem("certificates", ce.id, d)}
                  onCancel={() => setEditing(null)}
                />
              ) : (
                <EditableItem
                  key={ce.id}
                  editMode={editMode}
                  onEdit={() => startEdit("certificates", ce.id)}
                  onDelete={() => removeItem("certificates", ce.id)}
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
                      style={{ width: 34, height: 34 }}
                    >
                      <Icon name="award" size={16} />
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ fontSize: 14.5, fontWeight: 800 }}>
                        {ce.name}
                      </h3>
                      <div className="meta">
                        <span>
                          <Icon name="briefcase" size={13} />
                          {ce.issuer}
                        </span>
                        {ce.date ? (
                          <span>
                            <Icon name="calendar" size={13} />
                            {ce.date}
                          </span>
                        ) : null}
                        {ce.credentialId ? (
                          <span>
                            <Icon name="hash" size={13} />
                            <span className="ltr">{ce.credentialId}</span>
                          </span>
                        ) : null}
                      </div>
                      {ce.description ? (
                        <p className="tl-desc">{ce.description}</p>
                      ) : null}
                      {ce.link ? (
                        <a
                          style={{
                            color: "var(--accent)",
                            fontSize: 13,
                            fontWeight: 700,
                            display: "inline-flex",
                            gap: 5,
                            alignItems: "center",
                            marginTop: 6,
                          }}
                          href={ce.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Icon name="link" size={13} />
                          مشاهدهٔ گواهینامه
                        </a>
                      ) : null}
                    </div>
                  </div>
                </EditableItem>
              ),
            )}
          </div>
          {isFormOpen("certificates", "new") ? (
            <CertificateForm
              onSave={(d) => saveItem("certificates", "new", d)}
              onCancel={() => setEditing(null)}
            />
          ) : null}
          {editMode && !isFormOpen("certificates", "new") ? (
            <AddButton
              onClick={() => startEdit("certificates", "new")}
              label="افزودن گواهینامه"
            />
          ) : null}
        </>
      )}
    </SectionCard>
  );
}
