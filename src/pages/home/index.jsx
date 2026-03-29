import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../entities/session";
import { getAllCharacters } from "../../entities/character";
import { PageSpinner } from "../../shared/ui/Spinner";
import { PartyCard } from "../../features/party-card/PartyCard.jsx";

export const HomePage = () => {
  const { user } = useSession();
  const navigate = useNavigate();
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await getAllCharacters(user.id);
      const grouped = (data ?? []).reduce((acc, c) => {
        const k = String(c.party);
        acc[k] = acc[k] ? [...acc[k], c] : [c];
        return acc;
      }, {});
      setGroups(grouped);
      setLoading(false);
    };
    load();
  }, [user.id]);

  const partyEntries = Object.entries(groups).sort(
    ([a], [b]) => Number(a) - Number(b),
  );

  if (loading) return <PageSpinner />;

  return (
    <main className="flex-1 bg-slate-950 py-8 px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">My Teams</h1>
          <p className="text-slate-500 text-sm mt-1">{user?.email}</p>
        </div>
        <button
          onClick={() => navigate("/characters/new")}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
        >
          + New Character
        </button>
      </div>

      {partyEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-7xl mb-4">🌙</p>
          <p className="text-white text-xl font-semibold mb-2">No teams yet</p>
          <p className="text-slate-500 text-sm mb-8 max-w-xs">
            Add your first character and assign them to a team to get started.
          </p>
          <button
            onClick={() => navigate("/characters/new")}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Add first character
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {partyEntries.map(([partyNum, chars]) => (
            <PartyCard key={partyNum} partyNum={partyNum} characters={chars} partyEntries={partyEntries}/>
          ))}
        </div>
      )}
    </main>
  );
};
