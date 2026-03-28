import { Link } from 'react-router-dom'

export const ErrorPage = () => (
  <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
    <p className="text-8xl font-bold text-gray-100 dark:text-gray-800 select-none mb-2">
      404
    </p>
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      Page not found
    </h1>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <Link
      to="/"
      className="text-sm px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
    >
      Back to home
    </Link>
  </main>
)
