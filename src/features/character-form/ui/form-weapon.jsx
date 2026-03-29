import { inputClass } from "../constants/index.js";
import { FormSection } from "../../../shared/ui/FormSection.jsx";
import { Label } from "../../../shared/ui/Label.jsx";

export const FormWeapon = ({set, form}) => {
	return <FormSection title="Weapon">
			<Label>Weapon / Rating</Label>
			<input
			  type="text"
			  value={form.weapon_rating}
			  onChange={set("weapon_rating")}
			  placeholder="e.g. Staff of Homa R5"
			  className={inputClass}
			/>
		  </FormSection>
}