import EmptyState from "../common/EmptyState";
import Icon from "../common/Icon";
import SectionCard from "../common/SectionCard";
import TagInput from "../common/TagInput";

export default function Interests({ profile, editMode, setProfile }) {
  const updateInterests = (list) =>
    setProfile((prev) => ({
      ...(prev ?? profile),
      interests: Array.from(new Set(list)),
    }));

  return (
    <SectionCard icon="heart" title="علایق" titleId="interests-title">
      {profile.interests.length === 0 && !editMode ? (
        <EmptyState text="هنوز علایقی ثبت نشده است۔" />
      ) : (
        <>
          <div className="tags">
            {profile.interests.map((it, i) => (
              <span className="tag" key={it + "-" + i}>
                {it}
                {editMode ? (
                  <button
                    type="button"
                    className="no-print"
                    aria-label={"حذف " + it}
                    onClick={() =>
                      updateInterests(profile.interests.filter((v) => v !== it))
                    }
                  >
                    <Icon name="x" size={13} />
                  </button>
                ) : null}
              </span>
            ))}
          </div>
          {editMode ? (
            <div className="no-print" style={{ marginTop: 12 }}>
              <TagInput
                id="interest-input"
                label="افزودن علاقهٔ جدید"
                value={[]}
                onChange={(v) => updateInterests([...profile.interests, ...v])}
                placeholder="مثلاً عکاسی"
              />
            </div>
          ) : null}
        </>
      )}
    </SectionCard>
  );
}
