import { useState } from 'preact/hooks'
import { useFirebaseLiveCollection } from '../client/hooks.jsx'
import { collection } from 'firebase/firestore'
import { db } from '../client/firebase.js'
import { Spinner } from './Spinner.jsx'

const PROVA = [
    'albania',
    'armenia',
    'australia',
    'austria',
    'azerbaijan',
    'belgium',
    'croatia',
    'cyprus',
    'czechia',
    'denmark',
    'estonia',
    'finland',
    'france',
    'georgia',
    'germany',
    'greece',
    'iceland',
    'ireland',
    'israel',
    'italy',
    'latvia',
    'lithuania',
    'luxembourg',
    'malta',
    'moldova',
    'netherlands',
]

const MALUS = 25 ** 2 / 26 + 1 / 26

function sortBy(list, fn) {
    return list.slice().sort((a, b) => fn(a) - fn(b))
}

function compareLists(realWinnersList, playerList) {
    const playerNameToIndex = {}
    for (let i = 0; i < playerList.length; i++) {
        const player = playerList[i]
        playerNameToIndex[player] = i
    }

    let score = 0

    for (let i = 0; i < realWinnersList.length; i++) {
        const realWinner = realWinnersList[i]

        // realWinner \in playerSet
        if (playerNameToIndex[realWinner] !== undefined) {
            const j = playerNameToIndex[realWinner]

            score += (i - j) ** 2 / 26
        } else {
            score += MALUS
        }
    }

    return score
}

export const ClassificaPage = ({}) => {
    const utentiCollectionRef = collection(db, 'partite', 'eurovision-2024', 'utenti')
    const { docs: utentiDocs, loading: isUtentiDocsLoading } = useFirebaseLiveCollection(utentiCollectionRef)
    if (isUtentiDocsLoading) {
        return <Spinner />
    }

    console.log(utentiDocs)

    const utentiWithExactly26 = Object.entries(utentiDocs).filter(([, { classifica }]) => classifica.length === 26)

    console.log(utentiWithExactly26)

    const vincitori = sortBy(
        utentiWithExactly26.map(([email, { nickname, classifica }]) => ({
            email,
            nickname,
            score: compareLists(PROVA, classifica),
        })),
        ({ score }) => score
    )

    // const [vincitori, setVincenti] = useState([
    //     {
    //         email: 'foo@example.com',
    //         nickname: 'Foo',
    //         score: (Math.random() * 1000) | 0,
    //     },
    //     {
    //         email: 'bar@example.com',
    //         nickname: 'Bar',
    //         score: (Math.random() * 1000) | 0,
    //     },
    //     {
    //         email: 'baz@example.com',
    //         nickname: 'Baz',
    //         score: (Math.random() * 1000) | 0,
    //     },
    //     {
    //         email: 'foo@example.com',
    //         nickname: 'Foo',
    //         score: (Math.random() * 1000) | 0,
    //     },
    //     {
    //         email: 'bar@example.com',
    //         nickname: 'Bar',
    //         score: (Math.random() * 1000) | 0,
    //     },
    //     {
    //         email: 'baz@example.com',
    //         nickname: 'Baz',
    //         score: (Math.random() * 1000) | 0,
    //     },
    //     {
    //         email: 'foo@example.com',
    //         nickname: 'Foo',
    //         score: (Math.random() * 1000) | 0,
    //     },
    //     {
    //         email: 'bar@example.com',
    //         nickname: 'Bar',
    //         score: (Math.random() * 1000) | 0,
    //     },
    //     {
    //         email: 'baz@example.com',
    //         nickname: 'Baz',
    //         score: (Math.random() * 1000) | 0,
    //     },
    // ])

    return (
        <div class="card v-box">
            <div class="classifica-list v-box">
                {vincitori.map(({ nickname, score }, i) => (
                    <div class="classifica-item center h-box">
                        {i < 3 ? (
                            <>
                                <div class="place">{i + 1}&deg;</div>
                                <div class="nickname cool-text">@{nickname}</div>
                                <div class="spacer grow"></div>
                                <div class="score cool-text">{score.toFixed(2)}</div>
                            </>
                        ) : (
                            <>
                                <div class="nickname">@{nickname}</div>
                                <div class="spacer grow"></div>
                                <div class="score">{score.toFixed(2)}</div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
