export const inputClass =
  'w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 ' +
  'bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 ' +
  'text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow'

export const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
      {label}
    </label>
    {children}
  </div>
)
