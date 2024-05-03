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

export const LeaderboardEditor = ({ leaderboard, setLeaderboard }) => {
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
                        {CANTANTI.filter(({ id }) => !temporaryLeaderboard.includes(id)).map(
                            ({ id, nazione, cantante, canzone }) => (
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
                            )
                        )}
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

export const Leaderboard = ({ leaderboard, setLeaderboard, children }) => {
    const [editing, setEditing] = useState(false)

    return editing ? (
        <LeaderboardEditor
            leaderboard={leaderboard}
            setLeaderboard={newLeaderboard => {
                setLeaderboard(newLeaderboard)
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
            <div class="leaderboard v-box">{children}</div>
        </>
    )
}

Leaderboard.Heading = ({ children }) => <h3 class="center">{children}</h3>

Leaderboard.Text = ({ children }) => <div class="text center">{children}</div>

Leaderboard.NationList = ({ leaderboard }) => (
    <div class="nation-list v-box">
        {leaderboard.map((id, i) => {
            const { nazione, cantante, canzone } = CANTANTI_MAP[id]
            const posto = i + 1

            return <NationCard place={posto} nazione={nazione} cantante={cantante} canzone={canzone} />
        })}
    </div>
)
