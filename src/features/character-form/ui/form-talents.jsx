import { inputClass, TALENTS } from "../constants/index.js";
import { FormSection } from "../../../shared/ui/FormSection.jsx";
import { Label } from "../../../shared/ui/Label.jsx";

export const FormTalents = ({ setNum, form }) => {
  return (
    <FormSection title="Talents">
      <div className="grid grid-cols-3 gap-3">
        {TALENTS.map(({ key, label }) => (
          <div key={key}>
            <Label>{label}</Label>
            <input
              type="number"
              value={form[key]}
              onChange={setNum(key)}
              min={1}
              max={10}
              className={inputClass + " text-center"}
            />
          </div>
        ))}
      </div>
    </FormSection>
  );
};
