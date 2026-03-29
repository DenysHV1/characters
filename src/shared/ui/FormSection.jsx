export const FormSection = ({ title, children }) => {
  return (
    <div>
      <h3 className="text-amber-400/80 text-xs font-semibold uppercase tracking-widest mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
};
