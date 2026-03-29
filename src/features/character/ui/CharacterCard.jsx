import { CardActions } from "./card-actions.jsx";
import { CardArtifacts } from "./card-artifacts.jsx";
import { CardPortrait } from "./card-portrait.jsx";
import { CardTalents } from "./card-talants.jsx";

export const CharacterCard = ({ character, onEdit, onDelete }) => {
  const { name, img, weapon_rating, lvl, stars, talant_1, talant_2, talant_3 } =
    character;

  return (
    <div className="bg-slate-900 border border-amber-500/20 rounded-2xl overflow-hidden flex flex-col hover:border-amber-500/50 transition-colors">
      <CardPortrait name={name} img={img} lvl={lvl} stars={stars} />

      <div className="flex-1 flex flex-col gap-3 p-3">
        <CardTalents
          weapon_rating={weapon_rating}
          talant_1={talant_1}
          talant_2={talant_2}
          talant_3={talant_3}
        />

        <CardArtifacts character={character} />

        <CardActions onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
};
