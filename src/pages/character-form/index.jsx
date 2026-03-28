import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useSession } from '../../entities/session'
import { getCharacterById, createCharacter, updateCharacter } from '../../entities/character'
import { CharacterForm } from '../../features/character-form'
import { PageSpinner } from '../../shared/ui/Spinner'
import { Alert } from '../../shared/ui/Alert'

export const CharacterFormPage = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useSession()

  const isEdit = Boolean(id)
  const defaultParty = searchParams.get('party') ?? ''

  const [initialData, setInitialData] = useState(
    defaultParty ? { party: Number(defaultParty) } : undefined
  )
  const [loadingData, setLoadingData] = useState(isEdit)
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    const load = async () => {
      const { data, error } = await getCharacterById(id)
      if (error) setError(error.message)
      else setInitialData(data)
      setLoadingData(false)
    }
    load()
  }, [id, isEdit])

  const handleSubmit = async (form, imageFile) => {
    setSaving(true)
    setError('')
    setWarning('')

    const fn = isEdit
      ? updateCharacter(id, form, imageFile)
      : createCharacter({ ...form, user_id: user.id }, imageFile)

    const { error, warning } = await fn

    if (error) {
      setError(error.message)
    } else {
      if (warning) setWarning(warning)
      navigate(`/party/${form.party}`)
    }

    setSaving(false)
  }

  if (loadingData) return <PageSpinner />

  return (
    <main className="flex-1 bg-slate-950 py-10 px-6">
      <div className="max-w-lg mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? 'Edit Character' : 'New Character'}
          </h1>
        </div>

        <div className="space-y-3 mb-6">
          {error   && <Alert variant="error">{error}</Alert>}
          {warning && <Alert variant="warning">⚠ Image not saved: {warning}</Alert>}
        </div>

        <CharacterForm initialData={initialData} onSubmit={handleSubmit} loading={saving} />

      </div>
    </main>
  )
}
