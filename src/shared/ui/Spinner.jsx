export const Spinner = ({ className = '' }) => (
  <div className={`rounded-full animate-spin border-2 border-slate-700 border-t-amber-500 ${className}`} />
)

export const PageSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <Spinner className="w-8 h-8" />
  </div>
)
