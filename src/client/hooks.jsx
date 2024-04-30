import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { useEffect, useState } from 'preact/hooks'
import { auth } from '../client/firebase.js'

window.auth = auth
window.signInWithPopup = signInWithPopup
window.signOut = signOut

const provider = new GoogleAuthProvider()

export const useUser = () => {
    const [user, setUser] = useState(null)

    const login = async () => {
        await signInWithPopup(auth, provider)
    }

    const logout = async () => {
        await signOut(auth)
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user)
        })
    }, [])

    return [user, login, logout]
}
