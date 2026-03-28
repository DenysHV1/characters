import { Navigate } from 'react-router-dom'
import { useSession } from '../../entities/session'

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSession()

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 dark:border-gray-700 border-t-violet-600 rounded-full animate-spin" />
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}
