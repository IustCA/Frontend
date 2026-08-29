import Icon from "./Icon";

export default function EmptyState({ text, onAdd, addLabel }) {
  return (
    <div className="empty">
      <p>{text}</p>
      {onAdd ? (
        <button
          type="button"
          className="btn btn-outline btn-sm no-print"
          onClick={onAdd}
        >
          <Icon name="plus" size={15} />
          {addLabel || "افزودن"}
        </button>
      ) : null}
    </div>
  );
}
