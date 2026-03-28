import { useState } from 'react'
import { useSession } from '../../entities/session'
import { Field, inputClass } from '../../shared/ui/Field'
import { Alert } from '../../shared/ui/Alert'

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { signUp } = useSession()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    const { error } = await signUp(email, password)

    if (error) {
      setError(error.message)
    } else {
      setMessage('Account created! Check your email to confirm before signing in.')
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
          placeholder="Min. 6 characters"
          required
          autoComplete="new-password"
          className={inputClass}
        />
      </Field>

      <Field label="Confirm password">
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat your password"
          required
          autoComplete="new-password"
          className={inputClass}
        />
      </Field>

      {error   && <Alert variant="error">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 px-4 mt-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
        Create account
      </button>
    </form>
  )
}
