import { doc, setDoc } from 'firebase/firestore'
import { UserContextProvider, useFirebaseDoc, useFirebaseLiveDoc, useUserContext } from '../client/hooks.jsx'

import { UserEmail } from './User.jsx'
import { db } from '../client/firebase.js'
import { useEffect, useState } from 'preact/hooks'
import { Leaderboard } from './Leaderboard.jsx'
import { Spinner } from './Spinner.jsx'
import { Icon } from './Icon.jsx'

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
                <input
                    class="grow"
                    type="text"
                    placeholder="nickname..."
                    value={nickname}
                    onInput={e => setNickname(e.target.value)}
                />
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

    if (isUserDocLoading || !userDoc) {
        return <Spinner />
    }

    const { data: partita, loading: isPartitaLoading } = useFirebaseDoc(doc(db, 'partite', 'eurovision-2024'))
    if (isPartitaLoading) {
        return <Spinner />
    }

    const euroVisionDeadline = new Date(partita.scadenza.toDate())
    const currentDate = new Date()

    const isDeadlinePassed = currentDate >= euroVisionDeadline

    return (
        <>
            {!userDoc.nickname ? (
                <NicknameChooseCard />
            ) : (
                <div class="card v-box">
                    <h1 class="text-center">Benvenut* {userDoc.nickname}</h1>
                    {!isDeadlinePassed ? (
                        <div class="text">
                            <p>
                                Crea la tua classifica inserendo le nazioni nell'ordine in cui pensi si
                                posizioneranno
                            </p>
                            <ul>
                                <li>
                                    <p>
                                        Clicca una nazione nella colonna dei partecipanti per aggiungerla alla fine
                                        della tua classifica
                                    </p>
                                </li>
                                <li>
                                    <p>Clicca una nazione nella colonna della tua classifica per rimuoverla</p>
                                </li>
                            </ul>
                            <p>
                                Puoi non inserire subito esattamente 26 nazioni e continuare in un secondo momento
                            </p>
                        </div>
                    ) : (
                        <div class="text-center">
                            <p>L'EuroVision è già iniziato, non sono più ammesse iscrizioni</p>
                        </div>
                    )}
                    <Leaderboard
                        leaderboard={userDoc.classifica}
                        setLeaderboard={newLeaderboard => updateLeaderboard(newLeaderboard)}
                    >
                        <Leaderboard.Heading>La tua Classifica</Leaderboard.Heading>
                        {isDeadlinePassed ? (
                            <>
                                <Leaderboard.Text>
                                    {userDoc.classifica.length === 26 ? (
                                        <div class="text">
                                            <p>
                                                La tua classifica è completa, attendi la fine della scadenza per
                                                vedere i risultati!
                                            </p>
                                        </div>
                                    ) : (
                                        <div class="text">
                                            <p>
                                                Purtroppo la tua classifica non è completa e la scadenza è già
                                                passata
                                            </p>
                                        </div>
                                    )}
                                </Leaderboard.Text>
                            </>
                        ) : (
                            <>
                                <Leaderboard.EditButton />
                                <Leaderboard.Text>
                                    {userDoc.classifica.length !== 26 && (
                                        <div class="text">
                                            <p>
                                                <Icon name="error" /> la tua classifica deve avere{' '}
                                                <strong>esattamente 26 cantanti</strong>, modificala o non verrà
                                                considerata alla fine della scadenza!
                                            </p>
                                        </div>
                                    )}
                                </Leaderboard.Text>
                            </>
                        )}
                        <Leaderboard.NationList leaderboard={userDoc.classifica} />
                    </Leaderboard>
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
