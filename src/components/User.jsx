import { useUser } from '../client/hooks.jsx'

export const UserEmail = ({}) => {
    const [user] = useUser()

    if (!user) {
        return <span class="user email">???</span>
    }

    return <span class="user email">{user.email}</span>
}
