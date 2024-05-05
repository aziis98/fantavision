import { collection, doc, setDoc } from 'firebase/firestore'
import {
    UserContextProvider,
    useFirebaseLiveCollection,
    useFirebaseLiveDoc,
    useUserContext,
} from '../client/hooks.jsx'
import { Spinner } from './Spinner.jsx'
import { db } from '../client/firebase.js'
import { Leaderboard } from './Leaderboard.jsx'

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

    const utentiCollectionRef = collection(db, 'partite', 'eurovision-2024', 'utenti')
    const { docs: utentiDocs, loading: isUtentiDocsLoading } = useFirebaseLiveCollection(utentiCollectionRef)
    if (isUtentiDocsLoading) {
        return <Spinner />
    }

    const updateAdminLeaderboard = async leaderboard => {
        await setDoc(adminDocRef, { vincitori: leaderboard }, { merge: true })
    }

    const publishLeaderboard = async () => {
        await setDoc(partitaDocRef, { vincitori: adminDoc.vincitori }, { merge: true })
    }

    const unpublishLeaderboard = async () => {
        await setDoc(partitaDocRef, { vincitori: null }, { merge: true })
    }

    return (
        <>
            <div class="card v-box">
                <h1 class="center">Pannello di Controllo</h1>
                {adminDoc.vincitori &&
                    (partitaDoc.vincitori ? (
                        <button onClick={() => unpublishLeaderboard()}>Annulla Pubblicazione</button>
                    ) : (
                        <button onClick={() => publishLeaderboard()}>Pubblica Classifica</button>
                    ))}
                <Leaderboard
                    leaderboard={adminDoc.vincitori}
                    setLeaderboard={newLeaderboard => updateAdminLeaderboard(newLeaderboard)}
                >
                    <Leaderboard.Heading>Classifica Admin</Leaderboard.Heading>
                    <Leaderboard.EditButton />
                    <Leaderboard.Text>
                        <p>
                            Imposta la classifica dei vincitori, una volta inserita puoi pubblicarla con il tasto
                            sopra
                        </p>
                    </Leaderboard.Text>
                    <Leaderboard.NationList leaderboard={adminDoc.vincitori} />
                </Leaderboard>
            </div>
            <div class="card v-box">
                <h1 class="center">Debugging</h1>
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
                <div class="v-box center">
                    <h3>Utenti</h3>
                    <pre class="center">
                        <code>{JSON.stringify(utentiDocs, null, 2)}</code>
                    </pre>
                </div>
            </div>
        </>
    )
}

export const AdminPage = ({}) => {
    return (
        <UserContextProvider>
            <Admin />
        </UserContextProvider>
    )
}
