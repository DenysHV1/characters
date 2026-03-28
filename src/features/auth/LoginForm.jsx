import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../entities/session'
import { Field, inputClass } from '../../shared/ui/Field'
import { Alert } from '../../shared/ui/Alert'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn } = useSession()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Field label="Email">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
          className={inputClass}
        />
      </Field>

      <Field label="Password">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </Field>

      {error && <Alert variant="error">{error}</Alert>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 px-4 mt-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
        Sign in
      </button>
    </form>
  )
}
