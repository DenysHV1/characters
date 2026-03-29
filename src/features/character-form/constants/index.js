export const QUALITY_OPTIONS = [
  { value: 'good',   label: '★★★★★  Good'   },
  { value: 'middle', label: '★★★★    Middle' },
  { value: 'bad',    label: '★★★      Bad'    },
  { value: 'none',    label: '★      None'    },
]

export const TALENTS = [
  { key: 'talant_1', label: '⚔ Normal Atk' },
  { key: 'talant_2', label: '🌀 Skill'      },
  { key: 'talant_3', label: '💥 Burst'      },
]

export const DEFAULT_FORM = {
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

export const inputClass =
  "w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 " +
  "text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-shadow";