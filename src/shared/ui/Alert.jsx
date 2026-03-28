const STYLES = {
  error:   'bg-red-500/10   border-red-500/30   text-red-400',
  success: 'bg-green-500/10 border-green-500/30 text-green-400',
  warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
}

export const Alert = ({ variant = 'error', children }) => (
  <p className={`px-3.5 py-2.5 rounded-lg border text-sm ${STYLES[variant]}`}>
    {children}
  </p>
)
