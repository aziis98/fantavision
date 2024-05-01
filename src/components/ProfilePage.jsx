import { doc, setDoc } from 'firebase/firestore'
import { UserContextProvider, useFirebaseDoc, useFirebaseLiveDoc, useUserContext } from '../client/hooks.jsx'

import { UserEmail } from './User.jsx'
import { db } from '../client/firebase.js'
import { useState } from 'preact/hooks'
import { LeaderboardSorter } from './LeaderboardSorter.jsx'
import { Spinner } from './Spinner.jsx'

const NicknameChooseCard = ({}) => {
    const { user } = useUserContext()

    const [nickname, setNickname] = useState('')

    const handleSubmit = async () => {
        setDoc(
            doc(db, 'partite', 'eurovision-2024', 'utenti', user.email),
            {
                nickname,
            },
            {
                merge: true,
            }
        )
    }

    return (
        <div class="card v-box">
            <h1>Imposta un nickname</h1>
            <div class="text-center">
                Loggato come <UserEmail />
            </div>
            <div class="h-box">
                <input class="grow" type="text" placeholder="nickname..." value={nickname} onInput={e => setNickname(e.target.value)} />
                <button onClick={() => handleSubmit()}>OK</button>
            </div>
        </div>
    )
}

const Profile = ({}) => {
    const { user, loading, logout } = useUserContext()
    if (loading) {
        return <Spinner />
    }

    if (!user) {
        location.href = '/'
        return
    }

    const { data: partitaUser } = useFirebaseLiveDoc(doc(db, 'partite', 'eurovision-2024', 'utenti', user.email))
    if (!partitaUser) {
        return
    }

    return (
        <>
            {partitaUser.nickname ? (
                <div class="card v-box">
                    <h1 class="text-center">Benvenuto {partitaUser.nickname}</h1>
                    <div class="text">
                        <p>
                            Crea la tua classifica di 26 vincitori trascinando le nazioni dalla colonna di sinistra nella colonna di destra
                            nell'ordine che vuoi inviare.
                        </p>
                        <ul>
                            <li>
                                <p>Clicca nella colonna di sinistra per aggiungere alla fine una nazione alla tua classifica</p>
                            </li>
                            <li>
                                <p>Clicca nella colonna di destra per rimuovere una nazione dalla tua classifica</p>
                            </li>
                        </ul>
                    </div>
                    <LeaderboardSorter />
                </div>
            ) : (
                <NicknameChooseCard />
            )}
            <div class="card v-box">
                <h2>Account</h2>
                <button
                    onClick={() => {
                        logout()
                        location.href = '/'
                    }}
                >
                    Logout
                </button>
            </div>
        </>
    )
}

export const ProfilePage = ({}) => {
    return (
        <UserContextProvider>
            <Profile />
        </UserContextProvider>
    )
}
