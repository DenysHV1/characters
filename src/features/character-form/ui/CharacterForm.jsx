import { useState, useRef } from 'react'
import { ARTIFACTS } from '../../../shared/constants/artifacts'

const QUALITY_OPTIONS = [
  { value: 'good',   label: '★★★★★  Good'   },
  { value: 'middle', label: '★★★★    Middle' },
  { value: 'bad',    label: '★★★      Bad'    },
]

const TALENTS = [
  { key: 'talant_1', label: '⚔ Normal Atk' },
  { key: 'talant_2', label: '🌀 Skill'      },
  { key: 'talant_3', label: '💥 Burst'      },
]

const DEFAULT_FORM = {
  name: '',
  party: '',
  stars: 5,
  lvl: 1,
  weapon_rating: '',
  talant_1: 1,
  talant_2: 1,
  talant_3: 1,
  artefact_flover: 'good',
  artefact_pen:    'good',
  artefact_watch:  'good',
  artefact_cup:    'good',
  artefact_crown:  'good',
}

const inputClass =
  'w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 ' +
  'text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-shadow'

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-amber-400/80 text-xs font-semibold uppercase tracking-widest mb-3">
      {title}
    </h3>
    {children}
  </div>
)

const Label = ({ children }) => (
  <label className="block text-slate-400 text-xs font-medium mb-1.5">{children}</label>
)

export const CharacterForm = ({ initialData, onSubmit, loading }) => {
  const [form, setForm] = useState({ ...DEFAULT_FORM, ...initialData })
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(initialData?.img ?? null)
  const fileRef = useRef(null)

  const set    = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const setNum = (key) => (e) => setForm((f) => ({ ...f, [key]: Number(e.target.value) }))

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit(form, imageFile)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">

      {/* Basic Info */}
      <Section title="Basic Info">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Name</Label>
            <input
              type="text"
              value={form.name}
              onChange={set('name')}
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
              onChange={setNum('party')}
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
              onChange={setNum('lvl')}
              min={1}
              max={90}
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
                  n <= form.stars ? 'text-amber-400' : 'text-slate-700'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Portrait */}
      <Section title="Portrait">
        <div
          onClick={() => fileRef.current?.click()}
          className="relative aspect-[3/4] max-w-[180px] rounded-xl overflow-hidden bg-slate-800 border-2 border-dashed border-slate-700 hover:border-amber-500/50 cursor-pointer transition-colors flex items-center justify-center"
        >
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover object-top" />
          ) : (
            <div className="text-center text-slate-500 px-4">
              <p className="text-3xl mb-2">🖼</p>
              <p className="text-xs">Click to upload</p>
            </div>
          )}
          {preview && (
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
              Change image
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </Section>

      {/* Weapon */}
      <Section title="Weapon">
        <Label>Weapon / Rating</Label>
        <input
          type="text"
          value={form.weapon_rating}
          onChange={set('weapon_rating')}
          placeholder="e.g. Staff of Homa R5"
          className={inputClass}
        />
      </Section>

      {/* Talents */}
      <Section title="Talents">
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
                className={inputClass + ' text-center'}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Artifacts */}
      <Section title="Artifacts">
        <div className="space-y-2.5">
          {ARTIFACTS.map(({ key, icon, label }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xl w-6 text-center">{icon}</span>
              <span className="text-slate-400 text-xs w-36 shrink-0">{label}</span>
              <select
                value={form[key]}
                onChange={set(key)}
                className={inputClass + ' cursor-pointer flex-1'}
              >
                {QUALITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </Section>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-amber-950 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-amber-950/30 border-t-amber-950 rounded-full animate-spin" />
        )}
        Save Character
      </button>

    </form>
  )
}
