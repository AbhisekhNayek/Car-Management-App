/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'

// Create the context
const AuthContext = createContext()

// Create the provider
export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)

  // Fetch authenticated user on initial load
  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        if (res.ok) {
          setAuthUser(data)
        }
      } catch (error) {
        console.error('Error fetching authenticated user:', error)
      }
    }

    fetchAuthUser() // Fetch user when the app starts
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// Export the AuthContext to be used in other components
export default AuthContext
