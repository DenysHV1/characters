import { inputClass } from "../constants/index.js";
import { FormSection } from "../../../shared/ui/FormSection.jsx";
import { Label } from "../../../shared/ui/Label.jsx";

export const BasicInfo = ({form, setNum, set, setForm}) => {
  return (
    <FormSection title="Basic Info">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label>Name</Label>
          <input
            type="text"
            value={form.name}
            onChange={set("name")}
            placeholder="e.g. Hu Tao"
            required
            className={inputClass}
          />
        </div>

        <div>
          <Label>Party №</Label>
          <input
            type="number"
            value={form.party}
            onChange={setNum("party")}
            placeholder="1"
            min={1}
            required
            className={inputClass}
          />
        </div>

        <div>
          <Label>Level</Label>
          <input
            type="number"
            value={form.lvl}
            onChange={setNum("lvl")}
            min={1}
            max={100}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <Label>Rarity</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setForm((f) => ({ ...f, stars: n }))}
              className={`text-2xl leading-none transition-transform hover:scale-110 cursor-pointer ${
                n <= form.stars ? "text-amber-400" : "text-slate-700"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
    </FormSection>
  );
};
