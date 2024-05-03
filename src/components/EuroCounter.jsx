import { db } from '../client/firebase.js'

import { doc } from 'firebase/firestore'
import { useFirebaseDoc } from '../client/hooks.jsx'
import { useEffect, useState } from 'preact/hooks'
import { Spinner } from './Spinner.jsx'

// NOTE: This component is just needed to test the Firebase connection on the homepage
export const EurovisionCountdown = ({}) => {
    const { data: partita, loading: isPartitaLoading } = useFirebaseDoc(doc(db, 'partite', 'eurovision-2024'))
    if (isPartitaLoading) {
        return (
            <div class="euro-counter">
                <Spinner />
            </div>
        )
    }

    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 15 * 1000)
        return () => clearInterval(timer)
    }, [])

    const euroVisionDeadline = new Date(partita.scadenza.toDate())

    const daysLeft = Math.floor((euroVisionDeadline - currentDate) / (1000 * 60 * 60 * 24))
    const hoursLeft = Math.floor((euroVisionDeadline - currentDate) / (1000 * 60 * 60)) % 24
    const minutesLeft = Math.floor((euroVisionDeadline - currentDate) / (1000 * 60)) % 60

    return (
        <div class="euro-counter">
            {daysLeft}&nbsp;{daysLeft === 1 ? 'giorno' : 'giorni'}, {hoursLeft}&nbsp;{hoursLeft === 1 ? 'ora' : 'ore'} e{' '}
            {minutesLeft}&nbsp;
            {minutesLeft === 1 ? 'minuto' : 'minuti'}
        </div>
    )
}
