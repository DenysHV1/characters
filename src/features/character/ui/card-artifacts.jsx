import { ARTIFACTS } from "../../../shared/constants/artifacts.js";
import { QUALITY } from "../../../shared/constants/quality.js";

export const CardArtifacts = ({character}) => {
  return (
    <div>
      <p className="text-slate-500 text-xs mb-1.5">Artifacts</p>
      <div className="flex gap-1">
        {ARTIFACTS.map(({ key, icon, label }) => {
          const q = QUALITY[character[key]] ?? QUALITY.bad;
          return (
            <div key={key} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[16px] leading-none mb-1" title={label}>
                {icon}
              </span>
              <span
                className={`text-[10px] font-bold px-1 rounded border ${q.badge}`}
              >
                {q.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
