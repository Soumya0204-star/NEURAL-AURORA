import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'

export function AdminRoute({ children }) {
  const { user, profile, loading, profileLoading, isAdmin, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (loading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: 'var(--border-color)', borderTopColor: 'var(--accent)' }} />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Access Denied</h1>
          <p style={{ color: 'var(--text-secondary)' }}>You do not have permission to access this area.</p>
          {profile && (
            <p className="mt-2 text-xs opacity-50" style={{ color: 'var(--text-secondary)' }}>
              Signed in as {profile.email} (role: {profile.role})
            </p>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={async () => {
            await signOut()
            navigate('/login', { replace: true })
          }}
          className="rounded-xl px-6 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
          style={{ background: 'var(--accent)' }}
        >
          Go to Login
        </motion.button>
      </div>
    )
  }

  return children
}
