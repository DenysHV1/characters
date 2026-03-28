import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSession } from '../../entities/session'
import { getCharactersByParty, deleteCharacter, CharacterCard } from '../../entities/character'
import { PageSpinner } from '../../shared/ui/Spinner'
import { Alert } from '../../shared/ui/Alert'

export const PartyPage = () => {
  const { partyId } = useParams()
  const { user } = useSession()
  const navigate = useNavigate()

  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data } = await getCharactersByParty(user.id, Number(partyId))
      setCharacters(data ?? [])
      setLoading(false)
    }
    load()
  }, [partyId, user.id])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this character?')) return
    const { error } = await deleteCharacter(id)
    if (error) {
      setError(error.message)
    } else {
      setCharacters((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const handleEdit = (id) => navigate(`/characters/${id}/edit`)

  if (loading) return <PageSpinner />

  return (
    <main className="flex-1 bg-slate-950 py-8 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold text-white">
              Team <span className="text-amber-400">#{partyId}</span>
            </h1>
          </div>

          <button
            onClick={() => navigate(`/characters/new?party=${partyId}`)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
          >
            + Add Character
          </button>
        </div>

        {error && <Alert variant="error" className="mb-6">{error}</Alert>}

        {characters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-6xl mb-4">⚔</p>
            <p className="text-slate-400 mb-6">No characters in this team yet.</p>
            <button
              onClick={() => navigate(`/characters/new?party=${partyId}`)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
            >
              Add first character
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {characters.map((c) => (
              <CharacterCard
                key={c.id}
                character={c}
                onEdit={() => handleEdit(c.id)}
                onDelete={() => handleDelete(c.id)}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  )
}
