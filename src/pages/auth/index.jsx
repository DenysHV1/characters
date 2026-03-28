import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from '../../entities/session'
import { LoginForm, RegisterForm } from '../../features/auth'

const TABS = [
  { id: 'login',    label: 'Sign in'        },
  { id: 'register', label: 'Create account' },
]

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login')
  const { user } = useSession()

  if (user) return <Navigate to="/" replace />

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">

        {/* Tab switcher */}
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex gap-1 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {activeTab === 'login' ? 'Welcome back' : 'Get started'}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {activeTab === 'login'
              ? 'Sign in to your account to continue'
              : 'Create your account — it only takes a moment'}
          </p>
        </div>

        {/* key forces remount on tab switch → clears form state */}
        {activeTab === 'login' ? <LoginForm key="login" /> : <RegisterForm key="register" />}

      </div>
    </main>
  )
}
