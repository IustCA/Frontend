import Icon from "./Icon";

export default function EditableItem({ editMode, onEdit, onDelete, children }) {
  return (
    <div className={`item-box${editMode ? " item-box--editing" : ""}`}>
      {editMode ? (
        <div className="item-tools no-print">
          <button
            type="button"
            className="icon-btn"
            aria-label="ویرایش این مورد"
            onClick={onEdit}
          >
            <Icon name="pencil" size={15} />
          </button>
          <button
            type="button"
            className="icon-btn danger"
            aria-label="حذف این مورد"
            onClick={onDelete}
          >
            <Icon name="trash" size={15} />
          </button>
        </div>
      ) : null}
      {children}
    </div>
  );
}
