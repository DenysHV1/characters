import { useEffect, useState } from 'react'
import { supabase } from '../../shared/api/supabase'
import { SessionContext } from './context'

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) =>
    await supabase.auth.signInWithPassword({ email, password })

  const signUp = async (email, password) =>
    await supabase.auth.signUp({ email, password })

  const signOut = async () =>
    await supabase.auth.signOut()

  return (
    <SessionContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </SessionContext.Provider>
  )
}
