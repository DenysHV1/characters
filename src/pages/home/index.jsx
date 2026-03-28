import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../entities/session'
import { getAllCharacters } from '../../entities/character'
import { PageSpinner } from '../../shared/ui/Spinner'

const PartyCard = ({ partyNum, characters }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/party/${partyNum}`)}
      className="bg-slate-900 border border-amber-500/20 hover:border-amber-500/60 rounded-2xl overflow-hidden cursor-pointer group transition-all hover:scale-[1.02]"
    >
      <div className="grid grid-cols-2 gap-0.5 bg-slate-800">
        {Array.from({ length: 4 }).map((_, i) => {
          const char = characters[i]
          return (
            <div key={i} className="aspect-square bg-slate-800/80 overflow-hidden">
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
                <div className="w-full h-full flex items-center justify-center text-slate-800 text-lg">+</div>
              )}
            </div>
          )
        })}
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-amber-400 font-semibold">Team #{partyNum}</p>
          <p className="text-slate-500 text-xs mt-0.5">
            {characters.length} character{characters.length !== 1 ? 's' : ''}
          </p>
        </div>
        <span className="text-slate-600 group-hover:text-amber-400 transition-colors text-lg">→</span>
      </div>
    </div>
  )
}

export const HomePage = () => {
  const { user } = useSession()
  const navigate = useNavigate()
  const [groups, setGroups] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await getAllCharacters(user.id)
      const grouped = (data ?? []).reduce((acc, c) => {
        const k = String(c.party)
        acc[k] = acc[k] ? [...acc[k], c] : [c]
        return acc
      }, {})
      setGroups(grouped)
      setLoading(false)
    }
    load()
  }, [user.id])

  const partyEntries = Object.entries(groups).sort(([a], [b]) => Number(a) - Number(b))

  if (loading) return <PageSpinner />

  return (
    <main className="flex-1 bg-slate-950 py-8 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Teams</h1>
            <p className="text-slate-500 text-sm mt-1">{user?.email}</p>
          </div>
          <button
            onClick={() => navigate('/characters/new')}
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
              onClick={() => navigate('/characters/new')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Add first character
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {partyEntries.map(([partyNum, chars]) => (
              <PartyCard key={partyNum} partyNum={partyNum} characters={chars} />
            ))}
          </div>
        )}

      </div>
    </main>
  )
}
