import { doc, setDoc } from 'firebase/firestore'
import { UserContextProvider, useFirebaseDoc, useFirebaseLiveDoc, useUserContext } from '../client/hooks.jsx'

import { UserEmail } from './User.jsx'
import { db } from '../client/firebase.js'
import { useEffect, useState } from 'preact/hooks'
import { Leaderboard } from './Leaderboard.jsx'
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
    const { user, loading: isUserLoading, logout } = useUserContext()
    if (isUserLoading) {
        return <Spinner />
    }

    if (!user) {
        location.href = '/'
        return
    }

    const userDocRef = doc(db, 'partite', 'eurovision-2024', 'utenti', user.email)
    const { data: userDoc, loading: isUserDocLoading } = useFirebaseLiveDoc(userDocRef)

    useEffect(async () => {
        if (!isUserDocLoading && !userDoc) {
            console.log('Creating missing account for: ', user.email)
            await setDoc(userDocRef, { classifica: [], nickname: null })
        }
    }, [isUserDocLoading, userDoc])

    const updateLeaderboard = async newLeaderboard => {
        await setDoc(userDocRef, { classifica: newLeaderboard }, { merge: true })
    }

    if (isUserDocLoading) {
        return <Spinner />
    }

    return (
        <>
            {!userDoc.nickname ? (
                <NicknameChooseCard />
            ) : (
                <div class="card v-box">
                    <h1 class="text-center">Benvenuto {userDoc.nickname}</h1>
                    <div class="text">
                        <p>Crea la tua classifica inserendo le nazioni nella classifica nell'ordine in cui pensi che si classificheranno</p>
                        <ul>
                            <li>
                                <p>Clicca una nazione nella colonna dei partecipanti per aggiungerla alla fine alla tua classifica</p>
                            </li>
                            <li>
                                <p>Clicca una nazione nella colonne della tua classifica per rimuoverla</p>
                            </li>
                        </ul>
                        <p>Puoi non inserire subito esattamente 26 nazioni e continuare in un secondo momento</p>
                    </div>
                    <Leaderboard leaderboard={userDoc.classifica} setLeaderboard={newLeaderboard => updateLeaderboard(newLeaderboard)} />
                </div>
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
