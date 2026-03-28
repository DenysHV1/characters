import { ARTIFACTS } from '../../../shared/constants/artifacts'

const QUALITY = {
  good:   { badge: 'bg-amber-500/20 text-amber-400 border-amber-500/40', label: 'S' },
  middle: { badge: 'bg-slate-500/20 text-slate-400 border-slate-500/40', label: 'A' },
  bad:    { badge: 'bg-red-500/20   text-red-400   border-red-500/40',   label: 'B' },
}

const talentClass = (n) => {
  if (n >= 10) return 'bg-amber-500 text-amber-950'
  if (n >= 8)  return 'bg-teal-600/80 text-teal-100'
  return 'bg-slate-700 text-slate-300'
}

export const CharacterCard = ({ character, onEdit, onDelete }) => {
  const { name, img, weapon_rating, lvl, stars, talant_1, talant_2, talant_3 } = character

  return (
    <div className="bg-slate-900 border border-amber-500/20 rounded-2xl overflow-hidden flex flex-col hover:border-amber-500/50 transition-colors">

      {/* Portrait */}
      <div className="relative aspect-3/4 bg-slate-800 overflow-hidden">
        {img ? (
          <img src={img} alt={name} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-5xl select-none">
            {name?.[0] ?? '?'}
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
          <p className="text-amber-400 text-sm leading-none mb-1 tracking-widest">
            {'★'.repeat(Math.min(stars ?? 0, 5))}
          </p>
          <h3 className="text-white font-semibold text-base leading-tight truncate">{name}</h3>
        </div>

        <div className="absolute top-2 right-2 bg-slate-900/80 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
          Lv.{lvl}
        </div>
      </div>

      {/* Stats */}
      <div className="flex-1 flex flex-col gap-3 p-3">

        <div>
          <p className="text-slate-500 text-xs mb-1">⚔ Weapon</p>
          <p className="text-slate-200 text-sm font-medium truncate">{weapon_rating || '—'}</p>
        </div>

        <div>
          <p className="text-slate-500 text-xs mb-1.5">Talents</p>
          <div className="flex gap-1.5">
            {[talant_1, talant_2, talant_3].map((t, i) => (
              <span key={i} className={`flex-1 text-center text-xs font-bold py-1 rounded-lg ${talentClass(t)}`}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-slate-500 text-xs mb-1.5">Artifacts</p>
          <div className="flex gap-1">
            {ARTIFACTS.map(({ key, icon, label }) => {
              const q = QUALITY[character[key]] ?? QUALITY.bad
              return (
                <div key={key} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-base leading-none" title={label}>{icon}</span>
                  <span className={`text-[10px] font-bold px-1 rounded border ${q.badge}`}>
                    {q.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-2 mt-auto pt-1">
          <button
            onClick={onEdit}
            className="flex-1 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            ✏ Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 py-1.5 text-xs font-medium rounded-lg bg-red-950/50 hover:bg-red-900/60 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            🗑 Delete
          </button>
        </div>

      </div>
    </div>
  )
}
