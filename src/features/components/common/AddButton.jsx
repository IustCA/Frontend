import Icon from "./Icon";

export default function AddButton({ onClick, label }) {
  return (
    <button type="button" className="add-btn no-print" onClick={onClick}>
      <Icon name="plus" size={16} />
      {label}
    </button>
  );
}
