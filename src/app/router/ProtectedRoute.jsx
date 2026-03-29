import { Navigate } from 'react-router-dom'
import { useSession } from '../../entities/session'
import { PageSpinner } from '../../shared/ui/Spinner'

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSession()

  if (loading) return <PageSpinner />

  return user ? children : <Navigate to="/login" replace />
}
