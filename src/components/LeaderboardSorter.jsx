import { useState } from 'preact/hooks'
import { CANTANTI, CANTANTI_MAP } from '../client/data.js'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../client/firebase.js'
import { Spinner } from './Spinner.jsx'
import { useFirebaseLiveDoc, useUserContext } from '../client/hooks.jsx'

export const LeaderboardDesktopEditor = ({ leaderboard, setLeaderboard }) => {
    const [temporaryLeaderboard, setTemporaryLeaderboard] = useState(leaderboard)

    return (
        <>
            <div class="center">
                <button
                    onClick={() => {
                        setLeaderboard(temporaryLeaderboard)
                    }}
                >
                    Salva Classifica
                </button>
            </div>
            <div class="leaderboard editor">
                <div class="column">
                    <h3>Partecipanti</h3>
                    <div class="drag-region v-box">
                        {CANTANTI.filter(({ id }) => !temporaryLeaderboard.includes(id)).map(({ id, nazione, cantante, canzone }) => (
                            <div
                                class="nation"
                                onClick={() => {
                                    if (temporaryLeaderboard.includes(id)) {
                                        setTemporaryLeaderboard([...temporaryLeaderboard.filter(i => i !== id), id])
                                    } else {
                                        setTemporaryLeaderboard([...temporaryLeaderboard, id])
                                    }
                                }}
                            >
                                <div class="picture"></div>
                                <div class="nation-name">{nazione}</div>
                                <div class="singer-name">{cantante}</div>
                                <div class="canzone">{canzone}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div class="column">
                    <h3>La tua Classifica</h3>
                    <div class="drag-region v-box">
                        {temporaryLeaderboard.map((id, i) => {
                            const { nazione, cantante, canzone } = CANTANTI_MAP[id]
                            const posto = i + 1

                            return (
                                <div
                                    class="nation"
                                    onClick={() => {
                                        setTemporaryLeaderboard(temporaryLeaderboard.filter(i => i !== id))
                                    }}
                                >
                                    <div class="picture">{posto}</div>
                                    <div class="nation-name">{nazione}</div>
                                    <div class="singer-name">{cantante}</div>
                                    <div class="canzone">{canzone}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export const LeaderboardSorter = ({}) => {
    const { user } = useUserContext()
    const userDocRef = doc(db, 'partite', 'eurovision-2024', 'utenti', user.email)

    const userDoc = useFirebaseLiveDoc(userDocRef, [])
    if (userDoc.loading) {
        return <Spinner />
    }

    const leaderboard = userDoc.data.classifica

    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    if (loading) {
        return <Spinner />
    }

    return !editing ? (
        leaderboard.length === 0 ? (
            <div class="center">
                <button onClick={() => setEditing(true)}>Crea Classifica</button>
            </div>
        ) : (
            <>
                <div class="center">
                    <button onClick={() => setEditing(true)}>Modifica Classifica</button>
                </div>
                <div class="leaderboard">
                    <h3 class="text-center">La tua Classifica</h3>
                    <div class="nation-list v-box">
                        {leaderboard.map((id, i) => {
                            const { nazione, cantante, canzone } = CANTANTI_MAP[id]
                            const posto = i + 1

                            return (
                                <div class="nation">
                                    <div class="picture">{posto}</div>
                                    <div class="nation-name">{nazione}</div>
                                    <div class="singer-name">{cantante}</div>
                                    <div class="canzone">{canzone}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    ) : (
        <LeaderboardDesktopEditor
            leaderboard={leaderboard}
            setLeaderboard={async newLeaderboard => {
                setLoading(true)
                await setDoc(userDocRef, { classifica: newLeaderboard }, { merge: true })
                setLoading(false)

                setEditing(false)
            }}
        />
    )
}
