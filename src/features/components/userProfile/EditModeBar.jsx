import Icon from "../common/Icon";

export default function EditModeBar({ editMode, saveProfile, cancelProfile, editing }) {
  if (editMode) {
    return (
      <div className="edit-bar no-print" role="region" aria-label="نوار ویرایش">
        <span className="hint">
          <Icon name="pencil" size={14} />
          حالت ویرایش فعال است
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <div className="btn-wrap">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={saveProfile}
              aria-disabled={!!editing}
              aria-describedby={editing ? "save-tip-bar" : undefined}
            >
              <Icon name="check" size={14} />
              ذخیره تغییرات
            </button>
            {editing ? (
              <span id="save-tip-bar" className="quick-tooltip" role="tooltip">
                ابتدا فرم باز را تکمیل یا لغو کنید
              </span>
            ) : null}
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={cancelProfile}
          >
            انصراف
          </button>
        </div>
      </div>
    );
  } else return null;
}
