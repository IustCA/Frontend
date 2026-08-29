import Icon from "./Icon";

export default function FormActions({ onSave, onCancel }) {
  return (
    <div className="form-actions">
      <button type="button" className="btn btn-primary btn-sm" onClick={onSave}>
        <Icon name="check" size={15} />
        ذخیره
      </button>
      <button type="button" className="btn btn-ghost btn-sm" onClick={onCancel}>
        <Icon name="x" size={15} />
        انصراف
      </button>
    </div>
  );
}
