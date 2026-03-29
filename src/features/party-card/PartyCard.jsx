import { useNavigate } from "react-router-dom";

export const PartyCard = ({ partyNum, characters, partyEntries }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/party/${partyNum}`)}
      className="bg-slate-900 border border-amber-500/20 hover:border-amber-500/60 rounded-2xl overflow-hidden cursor-pointer group transition-all hover:scale-[1.02]"
    >
      <div className="grid grid-cols-2 gap-0.5 bg-slate-800">
        {Array.from({ length: 4 }).map((_, i) => {
          const char = characters[i];
          return (
            <div
              key={i}
              className="aspect-square bg-slate-800/80 overflow-hidden"
            >
              {char?.img ? (
                <img
                  src={char.img}
                  alt={char.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              ) : char ? (
                <div className="w-full h-full flex items-center justify-center text-slate-600 text-xl font-bold">
                  {char.name?.[0]}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-800 text-lg">
                  +
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-amber-400 font-semibold">
            {Number(partyNum) !== partyEntries.length ? `Team #${partyNum}` : `Other characters #${partyNum}`}
          </p>
          <p className="text-slate-500 text-xs mt-0.5">
            {characters.length} character{characters.length !== 1 ? "s" : ""}
          </p>
        </div>
        <span className="text-slate-600 group-hover:text-amber-400 transition-colors text-lg">
          →
        </span>
      </div>
    </div>
  );
};
