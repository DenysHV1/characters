import { Link, useNavigate } from 'react-router-dom'
import { useSession } from '../../entities/session'
import logo from '../../assets/logo.png';
export const Navbar = () => {
  const { user, signOut } = useSession()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <nav className="mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-base font-semibold text-amber-400 tracking-tight"
        >
          <img src={logo} alt="logo" className='max-w-[70px]'/>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-400 dark:text-gray-500 hidden sm:block truncate max-w-48">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
