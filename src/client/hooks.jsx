import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { useContext, useEffect, useState } from 'preact/hooks'
import { auth } from '../client/firebase.js'
import { createContext } from 'preact'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

window.auth = auth
window.signInWithPopup = signInWithPopup
window.signOut = signOut

const provider = new GoogleAuthProvider()

const UserContext = createContext()

/**
 * Hook to directly retrieve the user object and login/logout functions
 */
export const useUser = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const login = async () => {
        await signInWithPopup(auth, provider)
    }

    const logout = async () => {
        await signOut(auth)
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            console.log('[User]', user)
            setUser(user)
        })

        auth.authStateReady().then(() => {
            console.log('[User] Ready')
            setLoading(false)
        })
    }, [])

    return { user, loading, login, logout }
}

/**
 * Provider to wrap the application and provide the user object and login/logout functions to cache the current user
 */
export const UserContextProvider = ({ children }) => {
    const { user, loading, login, logout } = useUser()

    return <UserContext.Provider value={{ user, loading, login, logout }}>{children}</UserContext.Provider>
}

/**
 * Hook to retrieve the user object and login/logout functions from the context
 */
export const useUserContext = () => {
    return useContext(UserContext)
}

export const useFirebaseDoc = (reference, initialValue = null) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(initialValue)

    useEffect(async () => {
        const d = await getDoc(reference)
        setLoading(false)
        setData(d.data())
    }, [])

    return { data, loading }
}

export const useFirebaseLiveDoc = (reference, initialValue = null) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(initialValue)

    useEffect(() => {
        const unsubscribe = onSnapshot(reference, doc => {
            setLoading(false)
            setData(doc.data())
        })

        return () => unsubscribe()
    }, [])

    return { data, loading }
}
