import { useState } from 'preact/hooks'
import { CANTANTI, CANTANTI_MAP } from '../client/data.js'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../client/firebase.js'
import { Spinner } from './Spinner.jsx'
import { useFirebaseLiveDoc, useUserContext } from '../client/hooks.jsx'
import { Icon } from './Icon.jsx'

const NationCard = ({ place, nazione, cantante, canzone, ...rest }) => {
    return (
        <div class="nation h-box centered" {...rest}>
            <div class="picture">{place ?? ''}</div>
            <div class="v-box">
                <div class="card-title cool-text">{nazione}</div>
                <div class="card-subtitle">
                    {cantante} &bull; {canzone}
                </div>
            </div>
        </div>
    )
}

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
                <div class="source column">
                    <h3>Partecipanti</h3>
                    <div class="drag-region v-box">
                        {CANTANTI.filter(({ id }) => !temporaryLeaderboard.includes(id)).map(({ id, nazione, cantante, canzone }) => (
                            <NationCard
                                nazione={nazione}
                                cantante={cantante}
                                canzone={canzone}
                                onClick={() => {
                                    if (temporaryLeaderboard.includes(id)) {
                                        setTemporaryLeaderboard([...temporaryLeaderboard.filter(i => i !== id), id])
                                    } else {
                                        setTemporaryLeaderboard([...temporaryLeaderboard, id])
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div class="target column">
                    <h3>La tua Classifica</h3>
                    <div class="drag-region v-box">
                        {temporaryLeaderboard.map((id, i) => {
                            const { nazione, cantante, canzone } = CANTANTI_MAP[id]
                            const posto = i + 1

                            return (
                                <NationCard
                                    place={posto}
                                    nazione={nazione}
                                    cantante={cantante}
                                    canzone={canzone}
                                    onClick={() => {
                                        setTemporaryLeaderboard(temporaryLeaderboard.filter(i => i !== id))
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export const Leaderboard = ({}) => {
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

    return editing ? (
        <LeaderboardDesktopEditor
            leaderboard={leaderboard}
            setLeaderboard={async newLeaderboard => {
                setLoading(true)
                await setDoc(userDocRef, { classifica: newLeaderboard }, { merge: true })
                setLoading(false)

                setEditing(false)
            }}
        />
    ) : leaderboard.length === 0 ? (
        <div class="center">
            <button onClick={() => setEditing(true)}>Crea Classifica</button>
        </div>
    ) : (
        <>
            <div class="center">
                <button onClick={() => setEditing(true)}>Modifica Classifica</button>
            </div>
            <div class="leaderboard v-box">
                <h3 class="text-center">La tua Classifica</h3>
                {leaderboard.length < 26 && (
                    <div class="text">
                        <p>
                            <Icon name="warning" /> Attenzione: la tua classifica è incompleta, inserisci esattamente 26 cantanti per completarla o
                            non verrà considerata!
                        </p>
                    </div>
                )}
                <div class="nation-list v-box">
                    {leaderboard.map((id, i) => {
                        const { nazione, cantante, canzone } = CANTANTI_MAP[id]
                        const posto = i + 1

                        return <NationCard place={posto} nazione={nazione} cantante={cantante} canzone={canzone} />
                    })}
                </div>
            </div>
        </>
    )
}
