import { doc, setDoc } from 'firebase/firestore'
import { UserContextProvider, useFirebaseLiveDoc, useUserContext } from '../client/hooks.jsx'
import { Spinner } from './Spinner.jsx'
import { db } from '../client/firebase.js'

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

    const partitaDocRef = doc(db, 'partite', 'eurovision-2024')
    const { data: partitaDoc, loading: isPartitaDocLoading } = useFirebaseLiveDoc(partitaDocRef)
    if (isPartitaDocLoading) {
        return <Spinner />
    }

    const publishLeaderboard = async () => {
        await setDoc(partitaDocRef, { vincitori: adminDoc }, { merge: true })
    }

    const unpublishLeaderboard = async () => {
        await setDoc(partitaDocRef, { vincitori: null }, { merge: true })
    }

    return (
        <div class="card v-box">
            <h1>Pannello di Controllo</h1>
            <div class="text">
                <p>Pubblica la classifica finale dell'Eurovision 2024. In casi estremi puoi annullare la pubblicazione.</p>
            </div>
            {partitaDoc.vincitori ? (
                <button onClick={() => unpublishLeaderboard()}>Annulla Pubblicazione</button>
            ) : (
                <button onClick={() => publishLeaderboard()}>Pubblica Classifica</button>
            )}
            <div class="v-box center">
                <h3>Partita</h3>
                <pre class="center">
                    <code>{JSON.stringify(partitaDoc, null, 2)}</code>
                </pre>
            </div>
            <div class="v-box center">
                <h3>Admin</h3>
                <pre class="center">
                    <code>{JSON.stringify(adminDoc, null, 2)}</code>
                </pre>
            </div>
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
