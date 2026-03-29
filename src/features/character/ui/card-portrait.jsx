import clsx from "clsx";
import { lvlClass } from "../lib/talent-class.js";

export const CardPortrait = ({ name, img, stars, lvl }) => {
  return (
    <div className="relative aspect-3/4 bg-slate-800 overflow-hidden">
      {img ? (
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-600 text-5xl select-none">
          {name?.[0] ?? "?"}
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
        <p
          className={clsx(
            " text-[18px] leading-none mb-1 tracking-widest",
            stars < 5 ? "text-purple-400" : "text-amber-400",
          )}
        >
          {"★".repeat(Math.min(stars ?? 0, 5))}
        </p>
        <h3
          className={clsx(
            "font-semibold text-base leading-tight truncate",
            stars < 5 ? "text-purple-300" : "text-amber-300",
          )}
        >
          {name}
        </h3>
      </div>

      <div
        className={clsx(
          "absolute top-2 right-2 bg-slate-900/80  text-[14px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30",
          lvlClass(Number(lvl)),
        )}
      >
        Lv.{lvl}
      </div>
    </div>
  );
};
