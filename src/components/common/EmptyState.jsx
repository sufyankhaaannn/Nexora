function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        —
      </div>

      <h3 className="empty-state__title">
        {title}
      </h3>

      <p className="empty-state__description">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          className="empty-state__button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;