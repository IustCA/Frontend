import AddButton from "../common/AddButton";
import EmptyState from "../common/EmptyState";
import Icon from "../common/Icon";
import SectionCard from "../common/SectionCard";
import ProjectForm from "./ProjectForm";

const IMG_MOBILE =
  "https://image.qwenlm.ai/public_source/d4ae5256-6a4f-4e2a-b022-021cf3a0d064/191181357-05ef-41dc-a7ed-8875a3431772.png";

export default function Projects({
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
    <SectionCard icon="rocket" title="پروژه‌ها" titleId="projects-title">
      {profile.projects.length === 0 && !isFormOpen("projects", "new") ? (
        <EmptyState
          text="هنوز پروژه‌ای ثبت نشده است۔"
          onAdd={editMode ? () => startEdit("projects", "new") : null}
          addLabel="افزودن پروژه"
        />
      ) : (
        <>
          <div className="project-grid">
            {profile.projects.map((pr) =>
              isFormOpen("projects", pr.id) ? (
                <div key={pr.id} style={{ gridColumn: "1 / -1" }}>
                  <ProjectForm
                    initial={pr}
                    onSave={(d) => saveItem("projects", pr.id, d)}
                    onCancel={() => cancelItem("projects")}
                  />
                </div>
              ) : (
                <article className="project-card" key={pr.id}>
                  {editMode ? (
                    <div
                      className="item-tools no-print"
                      style={{ top: 8, insetInlineEnd: 8 }}
                    >
                      <button
                        type="button"
                        className="icon-btn"
                        style={{ background: "#fff" }}
                        aria-label="ویرایش پروژه"
                        onClick={() => startEdit("projects", pr.id)}
                      >
                        <Icon name="pencil" size={15} />
                      </button>
                      <button
                        type="button"
                        className="icon-btn danger"
                        style={{ background: "#fff" }}
                        aria-label="حذف پروژه"
                        onClick={() => removeItem("projects", pr.id)}
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  ) : null}
                  <div className="project-img">
                    <img
                      src={pr.image || IMG_MOBILE}
                      alt={"تصویر پروژهٔ " + pr.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = IMG_MOBILE;
                      }}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="project-body">
                    <div className="proj-top">
                      <h3>{pr.title}</h3>
                      <span className="tag tag-cat">{pr.category}</span>
                    </div>
                    <p className="project-desc">{pr.description}</p>
                    {pr.technologies && pr.technologies.length > 0 ? (
                      <div className="tags">
                        {pr.technologies.map((t, i) => (
                          <span className="tag" key={t + "-" + i}>
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className="meta">
                      {pr.startDate ? (
                        <span>
                          <Icon name="calendar" size={13} />
                          {dateRange(pr.startDate, pr.endDate, !!pr.ongoing)}
                        </span>
                      ) : null}
                      <span>
                        <Icon name="users" size={13} />
                        {pr.team}
                      </span>
                    </div>
                    <div className="proj-links">
                      {pr.demo ? (
                        <a
                          className="btn btn-primary btn-sm"
                          href={pr.demo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Icon name="external" size={14} />
                          مشاهده پروژه
                        </a>
                      ) : null}
                      {pr.github ? (
                        <a
                          className="btn btn-outline btn-sm"
                          href={pr.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Icon name="github" size={14} />
                          مشاهده کد
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
          {isFormOpen("projects", "new") ? (
            <ProjectForm
              onSave={(d) => saveItem("projects", "new", d)}
              onCancel={() => cancelItem("projects")}
            />
          ) : null}
          {editMode && !isFormOpen("projects", "new") ? (
            <AddButton
              onClick={() => startEdit("projects", "new")}
              label="افزودن پروژه"
            />
          ) : null}
        </>
      )}
    </SectionCard>
  );
}
