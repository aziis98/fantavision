import { UserContextProvider } from '../client/hooks.jsx'

const Admin = ({}) => {
    const { user, loading: isUserLoading, logout } = useUserContext()
    if (isUserLoading) {
        return <Spinner />
    }

    if (!user) {
        location.href = '/'
        return
    }

    const adminDocRef = doc(db, 'partite', 'eurovision-2024', 'segreti', 'admin')

    const { data: adminDoc, loading: isAdminDocLoading } = useFirebaseLiveDoc(adminDocRef)

    if (isAdminDocLoading) {
        return <Spinner />
    }

    return (
        <div class="card">
            <h1>Admin</h1>
        </div>
    )
}

export const AdminPage = ({}) => {
    return (
        <UserContextProvider>
            <Admin />
        </UserContextProvider>
    )
}
