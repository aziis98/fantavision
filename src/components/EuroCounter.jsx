import { db } from '../client/firebase.js'

import { doc } from 'firebase/firestore'
import { useFirebaseDoc } from '../client/hooks.jsx'

// NOTE: This component is just needed to test the Firebase connection on the homepage
export const EuroCounter = ({}) => {
    const partitaDoc = useFirebaseDoc(doc(db, 'partite', 'eurovision-2024'))
    if (partitaDoc.loading) {
        return <div class="euro-counter">???</div>
    }

    const euroVisionDeadline = new Date(partitaDoc.data.scadenza.toDate())

    const currentDate = new Date()

    const daysLeft = Math.floor((euroVisionDeadline - currentDate) / (1000 * 60 * 60 * 24))
    const hoursLeft = Math.floor((euroVisionDeadline - currentDate) / (1000 * 60 * 60)) % 24
    const minutesLeft = Math.floor((euroVisionDeadline - currentDate) / (1000 * 60)) % 60

    return (
        <div class="euro-counter">
            {daysLeft}&nbsp;{daysLeft === 1 ? 'giorno' : 'giorni'}, {hoursLeft}&nbsp;{hoursLeft === 1 ? 'ora' : 'ore'} e {minutesLeft}&nbsp;
            {minutesLeft === 1 ? 'minuto' : 'minuti'}
        </div>
    )
}
