export const talentClass = (n) => {
  if (n >= 10) return "bg-green-500 text-amber-950";
  if (n >= 6) return "bg-yellow-600/80 text-teal-100";
  return "bg-red-700 text-slate-300";
};

export const lvlClass = (n) => {
  if (n >= 90) return "text-green-400";
  if (n >= 80) return "text-yellow-400";
  return "text-red-400";
};