export const CardActions = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-2 mt-auto pt-1">
      <button
        onClick={onEdit}
        className="flex-1 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
      >
        ✏ Edit
      </button>
      <button
        onClick={onDelete}
        className="flex-1 py-1.5 text-xs font-medium rounded-lg bg-red-950/50 hover:bg-red-900/60 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
      >
        🗑 Delete
      </button>
    </div>
  );
};
