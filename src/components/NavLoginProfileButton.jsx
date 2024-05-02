import { useEffect, useState } from 'preact/hooks'
import { Spinner } from './Spinner.jsx'

export const NavLoginProfileButton = ({}) => {
    const [useUserHook, setUseUserHook] = useState(null)

    useEffect(() => {
        import('../client/hooks.jsx').then(({ useUser }) => {
            setUseUserHook(() => useUser)
        })
    }, [])

    if (useUserHook === null) {
        return (
            <a role="button" href="/login">
                Login
            </a>
        )
    }

    const { user, loading } = useUserHook()
    if (loading) {
        return (
            <a role="button" href="/login">
                <Spinner />
            </a>
        )
    }

    return user ? (
        <a role="button" href="/profile">
            Profile
        </a>
    ) : (
        <a role="button" href="/login">
            Login
        </a>
    )
}
