import Icon from "../common/Icon";

export default function EditModeBar({ editMode, saveProfile, cancelProfile }) {
  if (editMode) {
    return (
      <div className="edit-bar no-print" role="region" aria-label="نوار ویرایش">
        <span className="hint">
          <Icon name="pencil" size={14} />
          حالت ویرایش فعال است
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={saveProfile}
          >
            <Icon name="check" size={14} />
            ذخیره تغییرات
          </button>
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
