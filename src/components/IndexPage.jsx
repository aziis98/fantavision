import { doc } from 'firebase/firestore'
import { useFirebaseDoc } from '../client/hooks.jsx'
import { EurovisionCountdown } from './EuroCounter.jsx'
import { db } from '../client/firebase.js'
import { Spinner } from './Spinner.jsx'
import { LoginProfileButton } from './LoginProfileButton.jsx'

export const IndexPage = ({}) => {
    const { data: partita, loading: isPartitaLoading } = useFirebaseDoc(doc(db, 'partite', 'eurovision-2024'))
    if (isPartitaLoading) {
        return (
            <div class="euro-counter">
                <Spinner />
            </div>
        )
    }

    const euroVisionDeadline = new Date(partita.scadenza.toDate())
    const currentDate = new Date()

    const isDeadlinePassed = currentDate >= euroVisionDeadline

    if (!isDeadlinePassed) {
        return (
            <>
                <p>Partecipa al FantaVision, mancano solo</p>
                <EurovisionCountdown />
                <p>all'inizio dell'EuroVision, invia la tua classifica!</p>
            </>
        )
    }

    if (isDeadlinePassed && !partita.vincitori) {
        return (
            <>
                <p>L'EuroVision è già iniziato, non sono più ammesse iscrizioni</p>
            </>
        )
    }

    return (
        <>
            <p>È uscita la classifica finale del FantaVision!</p>
            <div class="h-box">
                <a role="button" href="/classifica">
                    Vai alla Classifica
                </a>
                <LoginProfileButton />
            </div>
        </>
    )
}
