import Icon from "./Icon";

export default function SectionCard({
  icon,
  title,
  titleId,
  action,
  children,
}) {
  return (
    <section className="card" aria-labelledby={titleId}>
      <div className="section-head">
        <span className="section-icon">
          <Icon name={icon} size={19} />
        </span>
        <h2 id={titleId}>{title}</h2>
        {action ? <div className="head-action">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
