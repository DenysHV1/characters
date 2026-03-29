import { ARTIFACTS } from "../../../shared/constants/artifacts.js";
import { FormSection } from "../../../shared/ui/FormSection.jsx";
import { inputClass, QUALITY_OPTIONS } from "../constants/index.js";

export const FormArtifacts = ({ set, form }) => {
  return (
    <FormSection title="Artifacts">
      <div className="space-y-2.5">
        {ARTIFACTS.map(({ key, icon, label }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="text-xl w-6 text-center">{icon}</span>
            <span className="text-slate-400 text-xs w-36 shrink-0">
              {label}
            </span>
            <select
              value={form[key]}
              onChange={set(key)}
              className={inputClass + " cursor-pointer flex-1"}
            >
              {QUALITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </FormSection>
  );
};
