import { useEffect } from 'preact/hooks'
import { useUser } from '../client/hooks.jsx'

export const LoginButton = ({}) => {
    const [user, login] = useUser()

    useEffect(() => {
        console.log('[Login]', user?.email)

        if (user) {
            // redirect to /profile
            location.href = '/profile'
        }
    }, [user])

    return <button onClick={() => login()}>Google Login</button>
}

export const LogoutButton = ({}) => {
    const [, , logout] = useUser()
    return <button onClick={() => logout()}>Logout</button>
}
