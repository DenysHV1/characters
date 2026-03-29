import { talentClass } from "../lib/talent-class.js";

const bestWeapon = ["Топ 1", "Топ 2", "Топ 3", "Топ 4", "Топ 5"];
const middleWeapon = ["Топ 6", "Топ 7", "Топ 8", "Топ 9", "Топ 10"];
const badWeapon = ["Топ 11", "Топ 12", "Топ 13", "Топ 14", "Топ 15"];

export const CardTalents = ({weapon_rating, talant_1, talant_2, talant_3}) => {
  return (
    <div>
      <div>
        <p className="text-slate-500 text-xs mb-1">⚔ Weapon</p>
        <p className={`text-sm font-medium truncate ${
          bestWeapon.includes(weapon_rating)
            ? "text-green-400"
            : middleWeapon.includes(weapon_rating)
            ? "text-yellow-400"
            : badWeapon.includes(weapon_rating)
            ? "text-red-400"
            : "text-slate-200"
        }`}>
          {weapon_rating || "—"}
        </p>
      </div>

      <div>
        <p className="text-slate-500 text-xs mb-1.5">Talents</p>
        <div className="flex gap-1.5">
          {[talant_1, talant_2, talant_3].map((t, i) => (
            <span
              key={i}
              className={`flex-1 text-center text-xs font-bold py-1 rounded-lg ${talentClass(t)}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
